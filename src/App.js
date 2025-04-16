import React from 'react';
import RecipeGenerator from './components/RecipeGenerator';

function App() {
  const m = {
    textAlign: 'center',
    color: '#6a0dad',
    fontFamily: 'Arial, sans-serif',
    marginTop: '20px',
    cu4rsor: 'pointer'
  };

  return (
    <div className="App">
      <h1 style={m}>🥚 Easter Recipe Generator 🐰</h1>
      <RecipeGenerator />
    </div>
  );
}

export default App;
