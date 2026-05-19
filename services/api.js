import axios from 'axios';

const api = axios.create({

  baseURL: 'https://api.themoviedb.org/3',

  headers: {

    accept: 'application/json',

    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YmVmNzhjZTMyYWZlNTRiOTBhOWJlY2VhMDE1YWZjZiIsIm5iZiI6MTc3NzQwNDU3My4wMDcsInN1YiI6IjY5ZjEwYTlkMGZiYjk0NTNhZDYyYzBjNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.venba2ORZ7uf8xJWW2ji0fPPyfqzt3f5s9WqybHfPrE',

  },
    params: {
    language: 'pt-BR'
  }

});

export default api;