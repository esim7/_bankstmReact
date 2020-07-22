import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';

export class MyselfTransfer extends Component {

    constructor() {
        super();
        this.toTransfer = this.toTransfer.bind(this);
        this.state = {
            cards: {},
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

    async toTransfer() {
        var selectFrom = document.querySelector('#card-number-from');
        var selectTo = document.querySelector('#card-number-to');

        var idFrom = selectFrom.options[selectFrom.selectedIndex].value;
        var idTo = selectTo.options[selectTo.selectedIndex].value;
        var sum = document.querySelector('#transfer-sum').value;

        var senderCard = this.state.cards.find(x => x.id == idFrom);

        if (idFrom == idTo || sum == '') {
            alert('Выбранная операция не корректна');
            return;
        }
        if (senderCard.amount < sum) {
            alert('Недостаточно средств на счету для перевода');
            return;
        }
        else {
            var myselfCardTransfer = new Object();
            myselfCardTransfer.CardIdFrom = idFrom;
            myselfCardTransfer.CardIdTo = idTo;
            myselfCardTransfer.Sum = sum;

            const token = await authService.getAccessToken();
            const response = fetch('api/BankCards',
                    {
                        method: 'PUT',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(myselfCardTransfer)
                    }).then(response => response.json())
                .then(() => {
                    alert('Перевод отправлен успешно');
                    //selectFrom.options[selectFrom.selectedIndex].text = '';
                    //selectTo.options[selectTo.selectedIndex].text = '';
                    document.querySelector('#transfer-sum').value = '';
                })
                .catch(error => console.error('Unable to update.', error));
        }
    }


    render() {
        var cards = Array.from(this.state.cards)
        return (
            <div class="col-sm-5 d-block mx-auto mt-5">
            <div class="alert alert-warning" role="alert">
            Перевести с карты: 
            </div>
            <select class="browser-default custom-select" id="card-number-from">
            
                {cards.map(data =>
                <option value={data.id}>{data.number}</option>
                )}
            </select>
            <div class="alert alert-success mt-5" role="alert">
            На карту:
            </div>
            <select class="browser-default custom-select" id="card-number-to">
                {cards.map(data =>
                    <option value={data.id}>{data.number}</option>
                )}
            </select>

            <input type="number" class="form-control mt-5" placeholder="Сумма пополнения" id="transfer-sum"></input>
            <button type="button" class="btn btn-outline-success mt-3 rounded-left" onClick={this.toTransfer} >Пополнить</button>
        </div>
        )
    }



}