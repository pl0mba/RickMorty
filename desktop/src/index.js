import React from 'react';
import ReactDOM from 'react-dom/client';
import Site from './App.js';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';


const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
}); 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<ApolloProvider client={client}>
  <Site/>
  </ApolloProvider>
  );

reportWebVitals();

