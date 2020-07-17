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
import { AppContext } from './components/app-context/Context';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    state = {
        currentAccountId: "",
        currentAccountDetails: {},
    }

    onGetCurrentAccountId = (id) => {

        this.setState({ currentAccountId: id });
        console.log(this.state.currentAccountId);
    }

    onGetCurrentAccountName = () => {
        console.log("lalala");
    }

  render () {
      return (
         
          <Layout>
              <AppContext.Provider value={{ onGetCurrentAccountId: this.onGetCurrentAccountId, onGetCurrentAccountName: this.onGetCurrentAccountName }}>
                <Route exact path='/' component={Home} /> 
                <Route path='/counter' component={Counter} />
                <AuthorizeRoute onGetCurrentAccountId={this.onGetCurrentAccountId} path='/mybank'  component={MyBank} /> 
                <AuthorizeRoute path='/fetch-data' component={FetchData} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                <Route path='/account-details' component={AccountDetails} />
            </AppContext.Provider>
          </Layout>
        
    );
  }
}
