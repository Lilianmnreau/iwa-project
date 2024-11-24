import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkeletonArticle = () => {
  return (
    <View style={styles.articleContainer}>
      <View style={styles.articleImage} />
      <View style={styles.articleContent}>
        <View style={styles.articleTitle} />
        <View style={styles.articleExcerpt} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  articleContainer: {
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
  articleImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: "#E0E0E0",
  },
  articleContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "center",
  },
  articleTitle: {
    width: "60%",
    height: 20,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 10,
  },
  articleExcerpt: {
    width: "80%",
    height: 14,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
  },
});

export default SkeletonArticle;