import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import Filmes from './components/Filmes';
import SearchBar from './components/Search';
import api from './services/api';

export default function App() {
  const [sections, setSections] = useState([]);
  const [query, setQuery] = useState('');
  const [searchMovies, setSearchMovies] = useState([]);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    loadMovies();
    searchMovie('');
  }, []);

  const searchMovie = async (text) => {
    try {
      setQuery(text);
      if (text.trim() === '') {
        const response = await api.get('/trending/movie/day');
        setSearchMovies(response.data.results);
        return;
      }
      const response = await api.get(`/search/movie?query=${encodeURIComponent(text)}`);
      setSearchMovies(response.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMovies = async () => {
    try {
      const [popular, topRated, upcoming, action] = await Promise.all([
        api.get('/movie/popular'),
        api.get('/movie/top_rated'),
        api.get('/movie/upcoming'),
        api.get('/discover/movie?with_genres=28'),
      ]);

      setSections([
        { id: '1', title: 'Populares', movies: popular.data.results },
        { id: '2', title: 'Mais bem avaliados', movies: topRated.data.results },
        { id: '3', title: 'Próximos lançamentos', movies: upcoming.data.results },
        { id: '4', title: 'Ação', movies: action.data.results },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchWrap}>
        <Text style={styles.header}>🎬 Filmes</Text>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder='Pesquisar filme...'
            placeholderTextColor='#999'
            value={query}
            onChangeText={searchMovie}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            style={styles.input}
          />
          {focused && <SearchBar query={query} movies={searchMovies} />}
        </View>
      </View>

      <FlatList
        data={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Filmes title={item.title} movies={item.movies} />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'
        onScrollBeginDrag={() => setFocused(false)}
        contentContainerStyle={{ paddingTop: 140, paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#121212' 
  },
  searchWrap: { 
    position: 'absolute', 
    top: 0, 
    left: 0, 
    right: 0, 
    zIndex: 20, 
    elevation: 20, 
    backgroundColor: '#121212' 
  },
  header: { 
    color: '#fff', 
    fontSize: 32, 
    fontWeight: 'bold', 
    marginLeft: 15, 
    marginTop: 20, 
    marginBottom: 20 
  },
  searchContainer: { 
    paddingHorizontal: 15, 
    paddingBottom: 10 
  },
  input: { 
    backgroundColor: '#222', 
    color: '#fff', 
    padding: 12, 
    borderRadius: 10, 
    fontSize: 16 
  },
});