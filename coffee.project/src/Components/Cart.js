import React, { Component } from "react";
import { Context } from "../Context/Context";
import {  NavLink} from "react-router-dom";


export default class Cart extends Component {
  static contextType = Context;
  state = {
    inputVal: "",
    promoActive: false
  };
  handleChange = e => {
    this.setState({
      inputVal: e.target.value
    });
  };
  render() {
    let { cart } = this.context;
    let {
      remove,
      increaseQuantity,
      decreaseQuantity,
      handlePromo,
      promoCode
    } = this.context;
    let estimatedPrice = !promoCode
      ? cart.reduce((acc, curr) => {
          return acc + curr.price * curr.quantity;
        }, 0)
      : cart.reduce((acc, curr) => {
          return acc + curr.price * curr.quantity * 0.995;
        }, 0);
    return (
      <div className="Cart">
        {cart.length > 0 && (
          <>
            <h3 className="Cart-title">your cart</h3>
            {cart.map(prod => {
              if (prod.quantity > 0) {
                return (
                  <p key={prod.name} className="Cart-product">
                    <span className="Cart-productName">{prod.name}</span>
                    <span className="Cart-productName">{prod.quantity}</span>
                    <span className="Cart-btn-container">
                      <button
                        className="Cart-btn-increase"
                        onClick={() => {
                          increaseQuantity(prod);
                        }}
                      >
                        +
                      </button>
                      <button
                        className="Cart-btn-decrease"
                        onClick={() => decreaseQuantity(prod)}
                      >
                        -
                      </button>
                    </span>
                    <span className="Cart-productPrice">
                      {prod.price * prod.quantity}$
                    </span>
                  </p>
                );
              } else {
                return null;
              }
            })}
            <p className="Cart-summedVal">{estimatedPrice.toFixed(2)}$</p>
            <button className="Cart-btn-remove" onClick={remove}>
              {" "}
              remove everything
            </button>
            <br />
            <form
              onSubmit={e => {
                e.preventDefault();
                handlePromo(e.target.code.value);
              }}
            >
              <input
                id="code"
                name="code"
                type="text"
                value={this.state.inputVal}
                onChange={this.handleChange}
              />
              <button disabled={promoCode} type="submit">
                submit me!!!!
              </button>
            </form>
          </>
        )}
        {cart.length === 0 && (
          <>
            <div>
              <p className="Cart-empty"> your cart is empty</p>
              <NavLink activeStyle = {{color: 'white'}} exact to={`/shop`}> 
              go back to shop!
              </NavLink>
            </div>
          </>
        )}
      </div>
    );
  }
}
