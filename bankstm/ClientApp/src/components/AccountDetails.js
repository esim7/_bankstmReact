import React, { Component } from 'react';
import { AppContext } from '../components/app-context/Context';
import authService from '../components/api-authorization/AuthorizeService';

export class AccountDetails extends Component {

    constructor() {
        super();
        this.getData = this.getData.bind(this);
        this.createBankCard = this.createBankCard.bind(this);
        this.state = {
            accountCards: {},
    };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const token = await authService.getAccessToken();
        const response = await fetch(`api/BankCards/${this.props.currentAccountId}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        this.setState({ accountCards: data });
        console.log(this.state.accountCards);
    }

    async createBankCard() {
        const token = await authService.getAccessToken();
        const response = fetch(`api/BankCards/${this.props.currentAccountId}`,
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
                this.getData();
            })
            .catch(error => console.log('Unable to add item.'));

    }


    render() {
        var cards = this.state.accountCards;
        if (!cards.length) {
            return (
                <div className="mt-5">
                    <h4>Данный банковский счет не содержит активных карт</h4>
                    <button type="button" class="btn btn-warning" onClick={this.createBankCard}>Заявка на открытие карточки</button>
                </div>
            )
        }
        return (
            <div class="col-sm-3 d-block mx-auto ">
            <button type="button" class="btn btn-warning" onClick={this.createBankCard}>Заявка на открытие новой карточки</button>
                {cards.map(data =>
                    <div class="card text-white mb-4 border border-white">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Font_Awesome_5_brands_cc-visa.svg/1200px-Font_Awesome_5_brands_cc-visa.svg.png" class="card-img" alt="..." />
                            <div className="card-img-overlay card-data">
                            <p className="card-text card-number mt-4">{data.number}</p>
                        </div>
                        <div className="card-footer text-dark">
                            <p>Держатель: {data.cardHolder} </p>
                            <p>Остаток: {data.amount} тенге</p>
                        </div>
                    </div>
            )}
            </div>
            )
        
    }
}
AccountDetails.contextType = AppContext;