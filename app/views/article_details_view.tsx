import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

export default function ArticleDetails({ route }) {
  const { article } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{article.titre}</Text>

      <Image source={{ uri: article.image }} style={styles.image} />

      <Text style={styles.date}>Publié le {article.date}</Text>

      <Text style={styles.description}>{article.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  date: {
    fontSize: 16,
    color: '#999',
    textAlign: 'right',
    marginBottom: 20,
  },
  excerptTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  excerpt: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
});
