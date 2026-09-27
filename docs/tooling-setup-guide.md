# Tooling Setup Guide — Prettier, ESLint, Husky, lint-staged, Commitlint

A from-scratch walkthrough of how this project's formatting, linting, and Git-hook tooling was set up. Useful as a reference for setting up the same stack in a new Expo project.

---

## Prettier

1. Add Prettier:

   ```bash
   yarn add -D prettier
   ```

2. Create a `.prettierrc` file with an empty object (`{}`). This is where the team's overrides to Prettier's default settings go as they come up.

3. Add a `.prettierignore` file. Without an ignore file, Prettier may waste time scanning generated files or folders you never want to format. The official documentation recommends creating `.prettierignore` so the CLI and editor integrations know what to skip.

4. Check the installed version:

   ```bash
   yarn prettier --version
   ```

5. Check the formatting of files without modifying them:

   ```bash
   yarn prettier . --check
   ```

6. Format the files:

   ```bash
   yarn prettier . --write
   ```

7. Add the Prettier VS Code extension, alongside the locally installed project version, so the extension uses the project's pinned version rather than a global one.

8. Create `.vscode/settings.json` to configure format-on-save.

---

## ESLint

ESLint checks your code against a set of rules defined by `eslint-config-expo`.

1. The recommended way to set up ESLint is to let the Expo CLI install and generate the configuration the first time you run the lint script:

   ```bash
   yarn lint
   ```

2. This installs `eslint` and `eslint-config-expo` as dev dependencies.

3. Confirm Yarn actually installed them:

   ```bash
   yarn why eslint
   ```

4. Confirm the binary runs:

   ```bash
   yarn eslint --version
   ```

### Debug pattern

When something's not working, walk down this chain to isolate where it broke:

```
Did package.json update?
      │
      ▼
Did Yarn install it?              →  yarn why eslint
      │
      ▼
Can Yarn execute it?              →  yarn eslint --version
      │
      ▼
Can Expo execute it?              →  yarn lint
```

### What `eslint-config-expo` actually does

By default, ESLint doesn't know anything about React Native. `eslint-config-expo` teaches it about:

- Expo
- React
- React Native
- TypeScript
- JSX
- Platform-specific files like `.ios.tsx`, `.android.tsx`, and `.web.tsx`

Technically: ESLint provides the linting _engine_, while `eslint-config-expo` provides a curated set of rules and configuration for Expo/React/React Native/JSX/TypeScript projects. It teaches ESLint how this project should be linted.

```
ESLint
   │
   ▼
Doesn't know React Native

        +

eslint-config-expo
```

### Flat Config

Modern ESLint uses **Flat Config**, where the exported value is an array of configuration objects. Each item in the array is applied in order, allowing later entries to override earlier ones. This became the default in ESLint 9 and Expo SDK 53+.

```
eslint-config-expo
      │
      ▼
Now it understands an Expo project
```

---

## Prettier + ESLint Integration

`eslint-config-prettier` disables ESLint's formatting-related rules so that Prettier remains the single source of truth for formatting.

Install the integration packages:

```bash
yarn add -D eslint-config-prettier eslint-plugin-prettier
```

These two packages have different responsibilities:

- **`eslint-config-prettier`** → turns off ESLint rules that conflict with Prettier.
- **`eslint-plugin-prettier`** → lets ESLint report Prettier formatting issues as lint errors.

Expo's recommended Flat Config setup uses `eslint-plugin-prettier`'s recommended configuration.

> A **config** is a rule book. It doesn't create new rules — it says "disable ESLint rules that would conflict with Prettier." Its only job is to prevent the two tools from fighting over formatting.
>
> A **plugin** adds new capabilities to ESLint. In this case, it adds a new rule: since the plugin is registered in the flat config, ESLint doesn't just check for things like unused variables or React Hooks rules — it also asks _"would Prettier format this differently?"_ If yes, ESLint reports an error.

---

## Git Safety Net: Husky, lint-staged, Commitlint

Husky provides the Git hook mechanism, while lint-staged runs tools only on staged files, keeping commits fast. Commitlint validates the commit message itself.

### 1. Husky

Add Husky:

```bash
yarn add -D husky
```

Husky's responsibility is narrow: run a script when a Git event happens. It listens for Git hooks like:

- `pre-commit`
- `commit-msg`
- `pre-push`
- `post-checkout`

...and executes whatever command you tell it to.

Initialize it:

```bash
yarn husky init
```

This automatically:

- Creates the `.husky/` directory.
- Creates a sample `pre-commit` hook.
- Adds a `"prepare": "husky"` script to `package.json`. This runs whenever dependencies are installed (e.g. after `yarn install` or `npm install`), so Husky (re)installs the Git hooks into the local `.git/hooks` directory. That's why every developer who clones the repo automatically gets the Git hooks after installing dependencies — nobody has to remember a manual setup step.

```
git clone
      │
      ▼
yarn install
      │
      ▼
prepare
      │
      ▼
Husky installs Git hooks
```

### 2. lint-staged

**Install it before referencing it anywhere** — the hook you wire up in the next step calls `lint-staged`, so the package has to exist first, or the hook will fail with a "command not found" the first time it runs.

```bash
yarn add -D lint-staged
```

Add a `lint-staged` configuration in `package.json`. Use `eslint --fix --no-warn-ignored` rather than `eslint . --fix`, because lint-staged automatically passes the staged filenames to the command — writing `eslint .` would lint the _entire_ project every time, defeating the purpose of lint-staged.

With Flat Config, ESLint can sometimes print warnings like:

```
File ignored because of a matching ignore pattern.
```

The `--no-warn-ignored` flag suppresses those unnecessary warnings when lint-staged passes files that ESLint ignores — it's specifically recommended for Flat Config users.

Also add a `package.json` script that runs it:

```json
"lint:staged": "lint-staged"
```

> **Don't name the script `lint-staged`.** `expo-doctor`'s "Check package.json for common issues" check fails if a script name exactly matches a binary in `node_modules/.bin` — and `lint-staged` installs a binary of the same name. `lint:staged` (or any other non-colliding name) avoids the conflict while still being a script you call by name.

**Only now**, with the package installed and configured, wire it into the pre-commit hook (`.husky/pre-commit`):

```bash
yarn lint:staged
```

The flow on every commit becomes:

```
git commit
      │
      ▼
Husky
      │
      ▼
lint-staged
      │
      ├── ESLint
      ├── Prettier
      └── Only staged files
```

Or, spelled out in full:

```
git commit
      │
      ▼
Husky starts
      │
      ▼
lint-staged starts
      │
      ▼
Find staged files
      │
      ▼
Run ESLint on staged TS/JS files
      │
      ▼
Run Prettier on staged files
      │
      ▼
If fixes were made, update the staged files
      │
      ▼
Commit succeeds
```

One nice feature of lint-staged: if ESLint or Prettier modify a staged file, it automatically re-stages those changes before completing the commit — no need to run `git add` again yourself.

### 3. Commitlint

Commitlint validates commit _messages_ (typically via a `commit-msg` Git hook) against a convention such as Conventional Commits — a different concern from `pre-commit`, which checks your _code_:

```
git commit
      │
      ▼
    Husky
      │
      ├───────────────────┐
      ▼                   ▼
  pre-commit          commit-msg
      │                   │
      ▼                   ▼
  lint-staged          Commitlint
      │                   │
      ▼                   ▼
  ESLint              Validate message
  Prettier
```

- **`pre-commit`** checks your code.
- **`commit-msg`** checks your commit message.

Add the dependencies:

```bash
yarn add -D @commitlint/cli @commitlint/config-conventional
```

- **`@commitlint/cli`** — the command-line tool, i.e. the engine. It provides the executable that runs when you type `commitlint`. Its job: read the commit message, read the configuration, validate the message, exit with success or failure. It doesn't know what makes a commit message _valid_ — it only knows how to validate against whatever rules it's given.
- **`@commitlint/config-conventional`** — the standard Conventional Commits rules. This package has no executable; it exports a predefined set of rules based on the Conventional Commits specification, e.g.:
  - Allowed commit types (`feat`, `fix`, `docs`, `refactor`, `chore`, etc.)
  - Subject must not be empty.
  - Type must not be empty.
  - Header format must follow the conventional syntax.

  The CLI simply loads these rules and applies them.

Setup steps:

1. Create `commitlint.config.js` in the project root.
2. Add a `commit-msg` Git hook — this hook runs after you've written the commit message but before Git creates the commit, which is exactly the right place to reject invalid messages.
3. Add a script to `package.json`:

   ```json
   "commitlint:check": "commitlint --edit"
   ```

   > **Don't name the script `commitlint`.** Just like with `lint-staged` above, `@commitlint/cli` installs a binary named `commitlint` into `node_modules/.bin`, so a script named exactly `commitlint` trips the same `expo-doctor` conflict check. Suffixing it (`commitlint:check`) sidesteps the collision.

4. Add to `.husky/commit-msg`:

   ```bash
   yarn commitlint:check "$1"
   ```

   Where:
   - `"$1"` is the path to the temporary file Git creates containing the commit message.
   - Husky passes that file to the hook.
   - `commitlint --edit` (via the `commitlint:check` script) reads the message from that file and validates it.
   - With npm instead of Yarn, running a script with arguments needs the `--` separator: `npm run commitlint:check -- "$1"`.

### Valid commit syntax

```
<type>(optional-scope): <subject>
```
