import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * Renders a rating component with stars and an optional average rating.
 *
 * @param {number} rating - The rating value to be displayed, typically between 0 and 5.
 * @param {boolean} [showAverage=true] - A flag to indicate whether to display the average rating value.
 *                                        Defaults to true.
 */


export const renderRating = (rating: number, showAverage: boolean = true) => {
    const roundedRating = Math.round(rating * 2) / 2;
    const fullStars = Math.floor(roundedRating);
    const halfStar = roundedRating - fullStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {[...Array(fullStars)].map((_, index) => (
                <Ionicons key={`full-${index}`} name="star" size={18} color="#FFD700" />
            ))}
            {halfStar === 1 && <Ionicons name="star-half" size={18} color="#FFD700" />}
            {[...Array(emptyStars)].map((_, index) => (
                <Ionicons key={`empty-${index}`} name="star-outline" size={18} color="#FFD700" />
            ))}
        </View>
    );
};