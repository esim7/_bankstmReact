import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { MyBank } from './components/MyBank';
import { Operations } from './components/Operations';
import { Addition } from './components/Addition';
import { MyselfTransfer } from './components/MyselfTransfer';
import { GlobalTransfer } from './components/GlobalTransfer';
import { Store } from './components/Store';
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
        };

    }

    onGetCurrentAccountData(id) {
        console.log(id);
        this.setState({ currentAccountId: id});
        
    }

    async onCreateNewCard () {
        const token = await authService.getAccessToken();
        const response = fetch(`api/BankCards/${this.state.currentAccountId}`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({})
                }).then(response => response.json())
            .then(() => {
                
            })
            .catch(error => console.log('Unable to add item.'));
    }

  render () {
      return (
          
          <Layout>
              <AppContext.Provider value={{ onGetCurrentAccountData: this.onGetCurrentAccountData}}>
                <Route exact path='/' component={Home} /> 
                
                <AuthorizeRoute onGetCurrentAccountId={this.onGetCurrentAccountId} path='/mybank'  component={MyBank} /> 
                
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} /> 

                <AuthorizeRoute path='/operations' component={Operations} /> 

                <Route path='/addition' render={() => {
                    return <Addition />
                }} />
                <Route path='/global-transfer' render={() => {
                    return <GlobalTransfer />
                }} />
                <Route path='/myself-transfer' render={() => {
                    return <MyselfTransfer />
                }} />
                <Route path='/account-details' render={() => {
                    return <AccountDetails currentAccountId={this.state.currentAccountId} />       
                }} />

                <Route path='/store' render={() => {
                    return <Store  />
                }} />

            </AppContext.Provider>
          </Layout>
        
    );
  }
}
