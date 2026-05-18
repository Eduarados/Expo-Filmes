import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';

import Filmes from './components/Filmes';
import api from './services/api';

export default function App() {

  const [sections, setSections] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {

    try {

      const [
        popular,
        topRated,
        upcoming,
        action,
      ] = await Promise.all([

        api.get('/movie/popular'),

        api.get('/movie/top_rated'),

        api.get('/movie/upcoming'),

        api.get('/discover/movie?with_genres=28'),

      ]);

      setSections([

        {
          id: '1',
          title: 'Populares',
          movies: popular.data.results,
        },

        {
          id: '2',
          title: ' Mais bem avaliados',
          movies: topRated.data.results,
        },

        {
          id: '3',
          title: 'Próximos lançamentos',
          movies: upcoming.data.results,
        },

        {
          id: '4',
          title: ' Ação',
          movies: action.data.results,
        },

      ]);

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>
        🎬 Filmes
      </Text>

      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (

          <Filmes
            title={item.title}
            movies={item.movies}
          />

        )}

        showsVerticalScrollIndicator={false}

      />

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20,
  },

  header: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 20,
  },

});