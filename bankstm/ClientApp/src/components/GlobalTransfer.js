import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';

export class GlobalTransfer extends Component {

    constructor() {
        super();
        this.state = {
            currentCards: {},
            allCards: {},
        };
    }

    componentDidMount() {
        this.getData();
        this.getAllData();
    }

    async getData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/BankAccounts', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        var { bankCards } = data[0];
        this.setState({ currentCards: bankCards });
    }

    async getAllData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/BankCards', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        console.log(data);
        //var { bankCards } = data[0];
        this.setState({ allCards: data });
    }

    async toTransfer() {
        var selectFrom = document.querySelector('#card-number-from');
        var selectTo = document.querySelector('#card-number-to');

        var idFrom = selectFrom.options[selectFrom.selectedIndex].value;
        var idTo = selectTo.options[selectTo.selectedIndex].value;
        var sum = document.querySelector('#transfer-sum').value;


        console.log(idFrom);
        console.log(idTo);
        console.log(sum);

        //if (idFrom == idTo) {
        //    alert('Выбранная операция не корректна');
        //    return;
        //}
        //else {
        //    var myselfCardTransfer = new Object();
        //    myselfCardTransfer.CardIdFrom = idFrom;
        //    myselfCardTransfer.CardIdTo = idTo;
        //    myselfCardTransfer.Sum = sum;

        //    const token = await authService.getAccessToken();
        //    const response = fetch('api/BankCards',
        //            {
        //                method: 'PUT',
        //                headers: {
        //                    'Authorization': `Bearer ${token}`,
        //                    'Accept': 'application/json',
        //                    'Content-Type': 'application/json'
        //                },
        //                body: JSON.stringify(myselfCardTransfer)
        //            }).then(response => response.json())
        //        .then(() => {
        //            alert('Перевод отправлен успешно');
        //            selectFrom.options[selectFrom.selectedIndex].text = '';
        //            selectTo.options[selectTo.selectedIndex].text = '';
        //            document.querySelector('#transfer-sum').value = '';
        //        })
        //        .catch(error => console.error('Unable to update.', error));
        //}
    }


    render() {
        var cards = Array.from(this.state.currentCards);
        var someCards = Array.from(this.state.allCards);
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
                    {someCards.map(card =>
                        <option value={card.id}>{card.number}</option>
                    )}
                </select>

                <input type="number" class="form-control mt-5" placeholder="Сумма пополнения" id="transfer-sum"></input>
                <button type="button" class="btn btn-outline-success mt-3 rounded-left" onClick={this.toTransfer} >Пополнить</button>
            </div>
            )
    }
}