// translation_view.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

interface Language {
  code: string;
  label: string;
}

export default function TranslationView() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);

  useEffect(() => {
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  const languages: Language[] = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'Anglais' }
  ];

  const changeLanguage = (code: string) => {
    setSelectedLanguage(code);
    i18n.changeLanguage(code);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{t('choose_language')}</Text>
      </View>
      {languages.map((language) => (
        <TouchableOpacity
          key={language.code}
          style={styles.languageOption}
          onPress={() => changeLanguage(language.code)}
        >
          <Text style={styles.languageText}>{language.label}</Text>
          {selectedLanguage === language.code && (
            <Ionicons name="checkmark" size={24} color="green" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
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
    fontWeight: '600',
    color: '#37474F',
  },
  languageOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#B0BEC5',
  },
  languageText: {
    fontSize: 18,
    color: '#333',
  },
});