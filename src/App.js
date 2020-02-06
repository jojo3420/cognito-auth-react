import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'typeface-roboto';
import HomePage from 'pages/HomePage';
import SignInPage from 'pages/SignInPage';
import SignUpPage from 'pages/SignUpPage';
import ResetPasswordPage from 'pages/ResetPasswordPage';
import PageNotFoundPage from 'pages/PageNotFoundPage';
import SignInSuccessPage from 'pages/SignInSuccessPage';
import SignUpSuccessPage from 'pages/SignUpSuccessPage';
import SignUpConfirmPage from 'pages/SignUpConfirmPage';


function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/sign/in" component={SignInPage} />
        <Route path="/sign/in/success" component={SignInSuccessPage} />
        <Route exact path="/sign/up" component={SignUpPage} />
        <Route path="/sign/up/success" component={SignUpSuccessPage} />
        <Route path="/sign/up/confirm" component={SignUpConfirmPage} />
        <Route path="/reset/password" component={ResetPasswordPage} />
        {/*<Route component={PageNotFoundPage} />*/}
      </Switch>
    </>
  );
}

export default App;
