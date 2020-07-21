import React, { Component } from 'react';
import { AppContext } from '../components/app-context/Context';


export class AccountDetails extends Component {


    constructor(props) {
        super(props);
        this.state = {
            currentData: {}
        };

    }

    componentDidMount() {
        console.log(this.props);
    }


    render() {

        //console.log(this.state.currentData);
        //if (!this.state.currentData.bankCards )
        //    return (
        //        <div>
        //            <h4>Данный счет не имеет банковских карт, Вы можете сделать заявку на открытие карты!</h4>
        //            <button type="button" class="btn btn-warning">Заявка на открытие банковской карты</button>
        //        </div>
        //    )
        console.log(this.props);
        return (
                <div>pizda</div>
        )
}
}
AccountDetails.contextType = AppContext;