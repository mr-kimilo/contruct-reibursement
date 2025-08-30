

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router';
import { UserProvider } from './store';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
