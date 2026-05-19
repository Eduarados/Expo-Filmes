import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  Image,
} from 'react-native';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import Filmes from './components/Filmes.jsx';

import api from './services/api';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {

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
          title: '🔥 Populares',
          movies: popular.data.results,
        },

        {
          id: '2',
          title: '⭐ Mais bem avaliados',
          movies: topRated.data.results,
        },

        {
          id: '3',
          title: '🚀 Próximos lançamentos',
          movies: upcoming.data.results,
        },

        {
          id: '4',
          title: '💥 Ação',
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

        keyExtractor={(item) =>
          item.id
        }

        renderItem={({ item }) => (

          <Filmes
            title={item.title}
            movies={item.movies}
            navigation={navigation}
          />

        )}

        showsVerticalScrollIndicator={false}

      />

    </SafeAreaView>

  );
}

function DetailsScreen({ route }) {

  const { movie } = route.params;

  return (

    <SafeAreaView style={styles.detailsContainer}>

      <FlatList

        data={[movie]}

        keyExtractor={(item) =>
          item.id.toString()
        }

        renderItem={({ item }) => (

          <>

            <Image
              source={{
                uri:
                `https://image.tmdb.org/t/p/w500${item.poster_path}`
              }}
              style={styles.detailsImage}
            />

            <Text style={styles.detailsTitle}>
              {item.title}
            </Text>

            <Text style={styles.detailsDate}>
              📅 {item.release_date}
            </Text>

            <Text style={styles.detailsDescription}>
              {item.overview}
            </Text>

          </>

        )}

      />

    </SafeAreaView>

  );
}

export default function App() {

  return (

    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            title: 'Detalhes do Filme',
            headerStyle: {
              backgroundColor: '#121212',
            },
            headerTintColor: '#fff',
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 20,
  },

  detailsImage: {
  width: '100%',
  height: 500,
  borderRadius: 20,
  marginBottom: 20,
},

  header: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 20,
  },

  detailsContainer: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },

  detailsTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  detailsDate: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 20,
  },

  detailsDescription: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 28,
  },

});