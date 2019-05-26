import React, { Component } from "react";
import { Context, ContextConsumer } from "../Context/Context";

export default class Cart extends Component {
  static contextType = Context;

  render() {
    let { cart } = this.context;

    return (
      <ContextConsumer>
        {({ remove, increaseQuantity, decreaseQuantity }) => (
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
                          <button className="Cart-btn-increase" onClick={() => increaseQuantity(prod)}>
                            +
                          </button>
                          <button className="Cart-btn-decrease" onClick={() => decreaseQuantity(prod)}>
                            -
                          </button>
                        </span>
                        <span className="Cart-productPrice">{prod.price * prod.quantity}$</span>
                      </p>
                    );
                  } else {
                    return null;
                  }
                })}
                <p className="Cart-summedVal">
                  {cart.reduce((acc, curr) => {
                    return acc + curr.price * curr.quantity;
                  }, 0)}
                  $
                </p>
                <button className="Cart-btn-remove" onClick={remove}>
                  {" "}
                  remove everything
                </button>
              </>
            )}
            {cart.length === 0 && (
              <div>
                <p className="Cart-empty"> your cart is empty</p>{" "}
              </div>
            )}
          </div>
        )}
      </ContextConsumer>
    );
  }
}
