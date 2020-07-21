import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import { Link } from 'react-router-dom';
import { AppContext } from '../components/app-context/Context';

export class MyBank extends Component {

    constructor(props) {
        super(props);
        this.state = {
            accountData: {}
        };
        
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    render() {
        var { onGetCurrentAccountData } = this.context;
        var accData = this.state.accountData;
        if (!accData.length)
            return (
                <div>
                    <h2 className="mt-5">У вас нет действующих счетов!</h2>
                    <button className="mt-3 btn btn-outline-primary" onClick={this.createBankAccount}
                    >Открыть счет</button> 
                </div>
            )
        return (
            <div>
                {accData.map(data =>
                <div className="card mb-3">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img src="data:image/png;base64,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" class="card-img" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">Номер счета: {data.number}</h5>
                                <h3>Срок действия до: {data.validPeriod.slice(0, -17)} </h3>
                                    <h4>Остаток денежных средств на счету:  <i class="fas fa-tenge"></i></h4>
    
                            </div>
                            <span> 
                                    <Link tag={Link} onClick={() => onGetCurrentAccountData(data.id)} className="btn btn-outline-info float-right mr-5" to="/account-details">Детали
                                        
                                    </Link>
                                    
                            </span>
                        </div>
                    </div>
                    </div> 
                )}
            </div>
            );
    }
    

    async createBankAccount()
    {
        const token = await authService.getAccessToken();
        const response = fetch('api/BankAccounts', {
                method: 'POST',
            headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            })
            .then(response => response.json())
            .then(() => {
                console.log(response)
                
            })
            .catch(error => console.error('Unable to add item.', error));
    }

    async populateWeatherData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/BankAccounts', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ accountData: data });
        console.log(this.state.accountData);
    }

}
MyBank.contextType = AppContext;