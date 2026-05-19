import React from 'react';

import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function Filmes({
  title,
  movies,
  navigation,
}) {

  const renderMovie = ({ item }) => (

    <TouchableOpacity

      style={styles.card}

      activeOpacity={0.8}

      onPress={() =>

        navigation.navigate(
          'Details',
          { movie: item }
        )

      }
    >

      <Image
        source={{
          uri:
          `https://image.tmdb.org/t/p/w500${item.poster_path}`
        }}
        style={styles.image}
      />

      <Text
        style={styles.movieTitle}
        numberOfLines={2}
      >
        {item.title}
      </Text>

    </TouchableOpacity>

  );

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        {title}
      </Text>

      <FlatList

        horizontal

        data={movies}

        renderItem={renderMovie}

        keyExtractor={(item) =>
          item.id.toString()
        }

        showsHorizontalScrollIndicator={false}

        nestedScrollEnabled

        directionalLockEnabled

        initialNumToRender={5}

        maxToRenderPerBatch={5}

        windowSize={5}

        removeClippedSubviews

      />

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    marginBottom: 30,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 15,
  },

  card: {
    width: 180,
    marginLeft: 15,
  },

  image: {
    width: 180,
    height: 260,
    borderRadius: 15,
  },

  movieTitle: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
  },

});