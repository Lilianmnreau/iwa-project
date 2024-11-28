import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/**
 * Renders a rating component with stars and an optional average rating.
 *
 * @param {number} rating - The rating value to be displayed, typically between 0 and 5.
 * @param {boolean} [showAverage=true] - A flag to indicate whether to display the average rating value.
 *                                        Defaults to true.
 */
export const renderRating = (rating: number, showAverage: boolean = true) => {
  // Ensure rating is a valid number and between 0 and 5
  const validRating = Math.max(0, Math.min(rating, 5));
  const roundedRating = Math.round(validRating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const halfStar = roundedRating - fullStars >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  // Generate arrays safely
  const renderStars = (count: number, iconName: string) =>
    Array.from({ length: count }, (_, index) => (
      <Ionicons
        key={`${iconName}-${index}`}
        name={iconName}
        size={18}
        color="#FFD700"
      />
    ));

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {renderStars(fullStars, "star")}
      {halfStar === 1 && (
        <Ionicons name="star-half" size={18} color="#FFD700" />
      )}
      {renderStars(emptyStars, "star-outline")}
      {showAverage && (
        <Text style={{ marginLeft: 5, fontSize: 14, color: "#4B4B4B" }}>
          {roundedRating.toFixed(1)}
        </Text>
      )}
    </View>
  );
};
