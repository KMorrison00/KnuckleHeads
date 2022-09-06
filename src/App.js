import React, {useEffect} from 'react';
import './App.css';
import {Layout, Header} from './Layout.components';
import GameBoard from './GameBoard';
import {createDeck} from './api'

function App() {
  
  return (
    <div className="App">
      <Header> Card Game Knuckle HEads</Header>
      <Layout>
        <GameBoard />
      </Layout>
    </div>
  );
}

export default App;
