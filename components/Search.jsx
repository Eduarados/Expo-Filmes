import React from 'react';
import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';

export default function SearchBar({ query, movies }) {
  return (
    <View style={styles.dropdown}>
      <Text style={styles.header}>{query.trim() === '' ? ' Tendências' : ' Resultados'}</Text>
      <FlatList
        data={movies.slice(0, 8)}
        keyExtractor={(item) => item.id.toString()}
        nestedScrollEnabled
        keyboardShouldPersistTaps='handled'
        showsVerticalScrollIndicator={false}
        style={styles.list}
        renderItem={({ item }) => (
          <Pressable style={styles.item}>
            <Image source={{ uri: item.poster_path ? `https://image.tmdb.org/t/p/w200${item.poster_path}` : 'https://via.placeholder.com/50x75' }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.date}>{item.release_date}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: { 
    backgroundColor: '#1a1a1a', 
    borderRadius: 10, 
    marginTop: 8, 
    maxHeight: 400, 
    overflow: 'hidden' 
  },
  header: { 
    color: '#fff', 
    fontSize: 18, 
    fontWeight: 'bold', 
    padding: 15 
  },
  list: { 
    maxHeight: 330 
  },
  item: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 12, 
    borderTopWidth: 1, 
    borderTopColor: '#333' 
  },
  image: { 
    width: 50, 
    height: 75, 
    borderRadius: 8 
  },
  info: { 
    marginLeft: 12, 
    flex: 1 
  },
  title: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  date: { 
    color: '#999', 
    marginTop: 4 
  },
});