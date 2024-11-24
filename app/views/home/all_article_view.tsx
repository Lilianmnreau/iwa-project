import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function ArticlesPage({ navigation }) {
    const articles = useSelector((state: RootState) => state.article.articles); // Récupérer les articles depuis le store Redux

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.articleContainer} onPress={() => handleArticlePress(item)}>
            <Image source={{ uri: item.image }} style={styles.articleImage} />
            <View style={styles.articleContent}>
                <Text style={styles.articleTitle}>{item.titre}</Text>
                <Text style={styles.articleExcerpt}>{item.extrait_description}</Text>
            </View>
        </TouchableOpacity>
    );

    const handleArticlePress = (article) => {
        navigation.navigate('ArticleDetails', { article });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Tous les Articles</Text>
            </View>
            <FlatList
                data={articles}
                renderItem={renderItem}
                keyExtractor={item => item.id_article}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        marginRight: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    articleContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
    },
    articleImage: {
        width: 100,
        height: 100,
    },
    articleContent: {
        flex: 1,
        padding: 10,
    },
    articleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    articleExcerpt: {
        fontSize: 14,
        color: '#666',
    },
});