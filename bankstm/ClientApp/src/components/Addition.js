import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import { Link } from 'react-router-dom';

export class Addition extends Component {
    constructor() {
        super();
        this.state = {
            cards : {},
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/BankAccounts', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        var { bankCards } = data[0];
        this.setState({ cards: bankCards });
        console.log(this.state.cards);
        console.log(data);
    }

    async cardAdditing() {
        var select = document.querySelector('#card-number');
        var sum = document.querySelector('#adding-sum').value;
        var id = select.options[select.selectedIndex].value;

        var bankCard = new Object();
        bankCard.Amount = sum;
        bankCard.Id = id;

        const token = await authService.getAccessToken();
        const response = fetch(`api/BankCards/${id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(bankCard)
                }).then(response => response.json())
            .then(() => {
                alert('Пополнение успешно');
                //select.options[select.selectedIndex].text = '';
                document.querySelector('#adding-sum').value = '';
            })
            .catch(error => console.error('Unable to update.', error));
    }

    render() {
        var cards = Array.from(this.state.cards)
        return (
        <div class="col-sm-5 d-block mx-auto mt-5">
            <select class="browser-default custom-select" id="card-number">
                <option disabled selected>Укажите номер карты для пополнения</option>
                
                {cards.map(data =>
                <option value={data.id}>{data.number}</option>
                )}
            </select>
            <input type="number" class="form-control mt-2" placeholder="Сумма пополнения" id="adding-sum"></input>
            <button type="button" class="btn btn-outline-success mt-2 rounded-left" onClick={this.cardAdditing}>Пополнить</button>  
        </div>
            )
    }
}