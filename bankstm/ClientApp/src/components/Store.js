import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';

export class Store extends Component {

    constructor() {
        super();
        
        this.state = {
            
        };
    }


    render() {
        return (
        <div class="row mt-5">
            <div class="col-sm-6 mb-4">
                <div class="card">
                        <img src="https://lh3.googleusercontent.com/proxy/GnjRlRFlOXgCH4SpXBZJWmkfJfMekVJQCEpOAqwhXXVyg03fF5QC9tf4le6K9gAx5TqqgoWl8B1NgHWga_81ggyj0mHpKFFZuHNdCSd5iyrgOyqPxZFPYJ0vjqXJ8JTvnQ" class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">Оплата коммунальных платежей</h5>

                        <a href="#" class="btn btn-primary">Оплата</a>
                    </div>
                </div>
            </div>
                <div class="col-sm-6 mb-4">
                <div class="card" >
                        <img src="https://baigenews.kz/upload/iblock/e75/df79a0411f58c71fbeba2ba4c7da7184.jpg" class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">Оплата сотовой связи</h5>

                            <a href="#" class="btn btn-primary">Оплата</a>
                    </div>
                </div>
            </div>
                <div class="col-sm-6 mb-4">
                <div class="card" >
                        <img src="https://ih.drivenn.ru/h11x625xyhrcs_cfliio.jpeg" class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">Оплата штрафов и налогов</h5>

                            <a href="#" class="btn btn-primary">Оплата</a>
                    </div>
                </div>
            </div>
                <div class="col-sm-6 mb-4">
                <div class="card" >
                        <img src="https://topobrazovanie.ru/wp-content/uploads/2019/02/vuz.jpg" class="card-img-top" alt="..."/>
                    <div class="card-body">
                        <h5 class="card-title">Опалата ВУЗов</h5> 
                            <a href="#" class="btn btn-primary">Оплата</a>
                    </div>
                </div>
            </div>
            
        </div>
            )
    }
}