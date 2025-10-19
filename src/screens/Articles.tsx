import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { useTheme } from 'src/screens/ThemeContext';
import { darkTheme, lightTheme } from 'src/styles/themes';
import { useTranslation } from 'react-i18next';

const Articles: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [articleContent, setArticleContent] = useState<string>('');

  const { t } = useTranslation();
  const { isDarkMode } = useTheme();
  const dynamicStyles = isDarkMode ? darkTheme : lightTheme;

  const articles = [
    {
      image: require('../../assets/images/ArticlesImages/article_image_1.jpg'),
      title: t('lofiWhatIsIt'),
      content: t('lofiWhatIsItContent'),
    },
    {
      image: require('../../assets/images/ArticlesImages/article_image_2.jpg'),
      title: t('lofiForWorkAndStudy'),
      content: t('lofiForWorkAndStudyContent'),
    },
    {
      image: require('../../assets/images/ArticlesImages/article_image_3.jpg'),
      title: t('lofiGirlHistory'),
      content: t('lofiGirlHistoryContent'),
    },
  ];

  const openModal = (content: string) => {
    setArticleContent(content);
    setModalVisible(true);
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <Text style={[styles.title, dynamicStyles.text]}>{t('header_articles')}</Text>
      {articles.map((article, index) => (
        <View key={index} style={styles.articleContainer}>
          <TouchableOpacity onPress={() => openModal(article.content)}>
            <Image source={article.image} style={styles.image} />
            <Text style={[styles.caption, dynamicStyles.text]}>{article.title}</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalText}>{articleContent}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>{t('closeButton')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // Czarny background
    alignItems: 'center', // Centrowanie w poziomie
    justifyContent: 'center', // Centrowanie w pionie
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF', // Biały kolor tytułu
    marginBottom: 16,
  },
  articleContainer: {
    marginBottom: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#DF5202'
  },
  image: {
    width: 300,
    height: 150,
    borderRadius: 8,
  },
  caption: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: '#FFF', // Biały kolor podpisu
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  closeButton: {
    alignSelf: 'center',
    padding: 12,
    backgroundColor: '#DF5202', // Pomarańczowy kolor przycisku
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff', // Biały kolor tekstu na przycisku
    fontSize: 16,
  },
});

export default Articles;
