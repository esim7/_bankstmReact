import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { MyBank } from './components/MyBank';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import { AccountDetails } from './components/AccountDetails';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    onGetCurrentAccountId = () => {
        console.log("blabla");
    }

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
            <Route path='/counter' component={Counter} />
            <AuthorizeRoute path='/mybank' component={MyBank} onGetCurrentAccountId={this.onGetCurrentAccountId} /> 
        <AuthorizeRoute path='/fetch-data' component={FetchData} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            <Route path='/account-details' component={AccountDetails} />
      </Layout>
    );
  }
}
