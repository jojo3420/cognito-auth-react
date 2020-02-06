import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from 'store/store';

import Amplify, { Auth } from 'aws-amplify';
import awsConfig from './aws-exports';
Amplify.configure(awsConfig);


function Root() {
  return (
    <Provider store={store()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

export default Root;
