import React, { Component } from 'react';
import './Home.css';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
          <div className="card bg-dark text-white">
          <img src="https://belsat.eu/wp-content/uploads/2019/10/66113711.cms_.jpg" className="card-img image" alt="..."/>
              <div className="card-img-overlay">
                    <h5 className="card-title">Welcome to simple Banksys App</h5> 
        </div>
            </div>
      </div>
    );
  }
}
