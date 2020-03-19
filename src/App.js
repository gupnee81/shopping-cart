import React from 'react';
import {store} from './data';
import { cumulateProducts } from './utils/pricingRules';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartArray: [],
      price: 0
    }
  }
  ScanItems = (item)=>{
    this.setState({cartArray: [...this.state.cartArray, item]}, () => {
      this.setState({price: cumulateProducts(this.state.cartArray)});
    });
  }

  render() {
    const { cartArray, price } = this.state;
    return (
      <>
        <div className="box">
        {
          store && store.map((item) => {
            return (
              <div className="card" key={item.id}>
                <div className="card-image">
                  <img src={item.img} alt={item.name} width='250'/>
                  <div className="card-title">Name: {item.name}</div>
                  <div className="card-title">SKU: {item.sku}</div>
                  <div className="card-title">Price: ${item.price}</div>
                  <div className='card-title addButton' onClick={()=>{this.ScanItems(item)}}>Add</div>
                </div>
              </div>)
          })
        }
        </div>
        <div className="shopping-cart">
        {
          cartArray && cartArray.map((cart, index) => {
            return (
              <div className="shopping-row" key={index}>
                <span className="shopping-column">{cart.name}</span>
                <span>--------------</span>
                <span className="shopping-column">{cart.price}</span>
              </div>
            )
          })
        }
        <h2>SUBTOTAL ${price}</h2>
        </div>
      </>
    );
    }
}

export default App;
