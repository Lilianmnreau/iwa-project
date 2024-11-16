import { View, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomepageSearch() {
    const [query, setQuery] = useState('');
    const navigation = useNavigation();

    const handleFocus = () => {
        navigation.navigate('Map_Stack', { screen: 'Map', params: { fromHomepageSearch: true } }); 
    }

    return (
        <View style={styles.autocompleteWrapper}>
            <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
            <TextInput
                style={styles.textInput}
                value={query}
                placeholder="Commencez vos recherches !"
                onFocus={() => {handleFocus()}}
                scrollEnabled={false} // Empêche le texte de défiler
                onChangeText={setQuery}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    autocompleteWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    searchIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
    },
});