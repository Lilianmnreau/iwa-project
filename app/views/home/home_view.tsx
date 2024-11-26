import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import HomepageBanner from '../../components/homepage/homepage_banner';
import HomepageSearch from '../../components/homepage/homepage_search';
import HomepageFavorites from '../../components/homepage/homepage_favorites';
import HomepageArticles from '../../components/homepage/homepage_articles';

export default function HomeView() {
    const isLoggedIn = useSelector((state: any) => state.profil.isLoggedIn);

    const components = [
        { id: '1', component: <HomepageBanner /> },
        { id: '2', component: <HomepageSearch /> },
        ...(isLoggedIn ? [{ id: '3', component: <HomepageFavorites /> }] : []),
        { id: '4', component: <HomepageArticles /> },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.componentContainer} testID="home-item">
            {item.component}
        </View>
    );

    return (
        <FlatList
          data={components}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.container}
          testID="home-flatlist"
        />
      );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
    },
    componentContainer: {
        marginBottom: 20,
    },
});