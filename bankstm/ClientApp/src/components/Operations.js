import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import { Link } from 'react-router-dom';
import { AppContext } from '../components/app-context/Context';

export class Operations extends Component {

    render() {
        return (
            <div class="col-sm-5 d-block mx-auto ">
                <div className="col-xs-6 mt-5 mb-5"> 
                    <Link tag={Link} className="btn btn-success btn-lg btn-block" to="/addition">
                    <i className="fas fa-plus mr-3"></i>Пополнить счет
                    </Link>
                </div>
                <div className="col-xs-6 mt-5 mb-5">
                    
                    <Link tag={Link} className="btn btn-warning btn-lg btn-block" to="/global-transfer">
                    <i className="fas fa-random mr-3"></i>Перевод клиенту WorldBank
                    </Link>
                </div>
                <div className="col-xs-6 mt-5 mb-5"> 
                    <Link tag={Link} className="btn btn-info btn-lg btn-block" to="/myself-transfer">
                    <i className="fas fa-exchange-alt mr-3"></i>Перевод между своим карт-счетами
                    </Link>
                </div>
            </div>
            )
    }



}