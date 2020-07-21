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
import authService from './components/api-authorization/AuthorizeService';
import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.onGetCurrentAccountData = this.onGetCurrentAccountData.bind(this);
        this.state = {
            currentAccountId: "",
            currentAccountData: {}
        };

    }


    async onGetCurrentAccountData (id) {
        const token = await authService.getAccessToken();
        const response = await fetch(`api/BankAccounts/${id}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ currentAccountId: id, currentAccountData: data });
        console.log(this.state.currentAccountData);
        console.log(this.state.currentAccountId);
    }

    onGetCurrentAccountName = () => {
        console.log("lalala");
    }

  render () {
      return (
         
          <Layout>
              <AppContext.Provider value={{ onGetCurrentAccountData: this.onGetCurrentAccountData, onGetCurrentAccountName: this.onGetCurrentAccountName }}>
                <Route exact path='/' component={Home} /> 
                <Route path='/counter' component={Counter} />
                <AuthorizeRoute onGetCurrentAccountId={this.onGetCurrentAccountId} path='/mybank'  component={MyBank} /> 
                <AuthorizeRoute path='/fetch-data' component={FetchData} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                  <Route path='/account-details' component={AccountDetails} onGetCurrentAccountName={this.onGetCurrentAccountName}/>
            </AppContext.Provider>
          </Layout>
        
    );
  }
}
