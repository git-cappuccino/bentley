import { useState } from "react";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import AppText from "../AppText";

export default function ShopCard() {
  const [expandDescription, setExpandDescription] = useState(false);
  return (
    <View style={styles.card}>
      <View style={styles.row1}>
        <View style={styles.header}>
          <AppText style={styles.shopName} numberOfLines={1}>
            Bella Beauty & Wellness Studios (Truly Remarkable)
          </AppText>
          <AppText>4.8</AppText>
        </View>
        <AppText tone="secondary" numberOfLines={1}>
          Model Town, Ludhiana
        </AppText>
        <View style={styles.badge}>
          <AppText variant="label1Regular" tone="onPrimary">
            Confirmed
          </AppText>
        </View>
      </View>
      <View>
        <AppText>
          Haircut with <Text style={styles.stylist}>Amara</Text>{" "}
          <Text style={styles.oldPrice}>$60</Text> $45
        </AppText>
      </View>
      <View>
        <AppText variant="label2Bold" style={styles.bookingReferenceLabel}>
          Booking Reference
        </AppText>
        <AppText selectable numberOfLines={1} ellipsizeMode="middle">
          BK-2026-10-05-DDEB27FB-BE4D-4615062DAED4
        </AppText>
      </View>
      <View style={styles.descriptionWithToggle}>
        <AppText numberOfLines={expandDescription ? undefined : 3}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas harum
          error dolor molestias, eligendi ullam eveniet incidunt voluptates quis
          distinctio.
        </AppText>
        <AppText
          variant="label1"
          style={styles.toggle}
          onPress={() => setExpandDescription((prev) => !prev)}
        >
          {expandDescription ? "Show Less" : "Read More"}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  card: {
    gap: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radii.lg,
    padding: theme.spacing.lg,
    boxShadow: theme.elevation.e2,
  },
  row1: {
    gap: theme.spacing.xs,
  },
  header: {
    flexDirection: "row",
    gap: theme.spacing.lg,
    alignItems: "center",
  },
  shopName: {
    flex: 1,
  },
  badge: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radii.full,
    alignSelf: "flex-start",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
  },
  stylist: { ...theme.typography.label1, color: theme.colors.text.primary },
  oldPrice: {
    textDecorationLine: "line-through",
    color: theme.colors.text.tertiary,
  },
  bookingReferenceLabel: {
    textTransform: "uppercase",
  },
  descriptionWithToggle: {
    gap: theme.spacing.xs,
  },
  toggle: { color: theme.colors.primary },
}));
