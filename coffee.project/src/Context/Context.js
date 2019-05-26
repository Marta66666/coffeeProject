import React, { Component } from "react";
import items from "../fakeDatabase/data";

const Context = React.createContext();

class ContextProvider extends Component {
  state = {
    products: [ 

],
    filteredProducts: [],
    cart: [],
    origin: "all",
    maxPrice: 0
  };
// handling filter eventts
  handleChange = evt => {
    const type = evt.target.type;
    const name = evt.target.name;
    const value = evt.target.value;
    console.log(` type: ${type}, name: ${name}, value: ${value}`);
    this.setState({
      [name]: value
    }, this.filterProducts);
  };
  filterProducts = () => {
    // console.log("hi");
    let {
      products, origin, maxPrice
    } = this.state;
    let copy = [...products];
    if (origin !== 'all'){
      copy = copy.filter(item => item.origin === origin)
    }
    this.setState({
      filteredProducts: copy,
    })
  };
//mounting & formatting
  componentDidMount() {
    let products = this.formatData(items);
    let maxPrice = Math.max(...products.map(product => product.price));
    console.log(maxPrice);
    this.setState({
      products,
      filteredProducts: products,
      maxPrice
    });
    console.log(this.state);
  }

  formatData = items => {
    return items.map(item => {
      let id = item.sys.id;
      let image = item.fields.image.fields.file.url;

      return { ...item.fields, id, image, quantity: 0 };
    });
  };
// shop -- adding to cart
  add = prod => {
    this.setState(state => {
      let cartItems = [...this.state.cart];
      let AlreadyInCart = false;
      console.log(cartItems);
      cartItems.forEach(item => {
        if (item.name === prod.name) {
          AlreadyInCart = true;
          prod.quantity = ++prod.quantity;
          console.log("already in the cart");
        }
      });
      if (!AlreadyInCart) {
        prod.quantity = ++prod.quantity;
        cartItems.splice(cartItems.length, 0, prod);
      }
      return {
        cart: cartItems
      };
    });
  };
//basket -- removing all
  remove = () => {
    this.setState({
      cart: []
    });
  };
// basket increasing number of products
  increaseQuantity = prod => {
    this.setState(state => {
      let cartItems = [...this.state.cart];
      cartItems.forEach(item => {
        if (item.name === prod.name) {
          prod.quantity = ++prod.quantity;
        }
      });
      return {
        cart: cartItems
      };
    });
  };
  // basket decreasing num of products
  decreaseQuantity = prod => {
    this.setState(state => {
      let cartItems = [...this.state.cart];
      cartItems.forEach(item => {
        if (item.name === prod.name) {
          if (prod.quantity > 0) {
            prod.quantity = --prod.quantity;
            if (prod.quantity === 0) {
              let index = cartItems.indexOf(prod);
              console.log(index);
              cartItems.splice(index, 1);
            }
          }
        }
      });
      return {
        cart: cartItems
      };
    });
  };
  // rendering the ContextOrovider with values, methods
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          add: this.add,
          remove: this.remove,
          increaseQuantity: this.increaseQuantity,
          decreaseQuantity: this.decreaseQuantity,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

const ContextConsumer = Context.Consumer;

export { Context, ContextProvider, ContextConsumer };
