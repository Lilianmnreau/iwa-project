import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkeletonFavorite = () => {
  return (
    <View style={styles.favoriteContainer}>
      <View style={styles.favoriteImage} />
      <View style={styles.favoriteContent}>
        <View style={styles.favoriteTitle} />
        <View style={styles.favoriteExcerpt} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  favoriteContainer: {
    flexDirection: "row",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  favoriteImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
  },
  favoriteContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "center",
  },
  favoriteTitle: {
    width: "60%",
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 10,
  },
  favoriteExcerpt: {
    width: "80%",
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
});

export default SkeletonFavorite;