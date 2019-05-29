import React, { Component } from "react";
import items from "../fakeDatabase/data";


const Context = React.createContext();

class ContextProvider extends Component {
  state = {
    products: [],
    filteredProducts: [],
    cart: [],
    origin: "all",
    price: 0,
    maxPrice: 0,
    minPrice: 0,
    sortedByPrice: false,
    discount: false
  };
  // formatting data
  formatData = items => {
    return items.map(item => {
      let id = item.sys.id;
      let image = item.fields.image.fields.file.url;
      return { ...item.fields, id, image, quantity: 0 };
    });
  };

  //mounting & calling formatData
  componentDidMount() {
    let products = this.formatData(items);
    let maxPrice = Math.max(...products.map(product => product.price));
    this.setState({
      products,
      filteredProducts: products,
      price: maxPrice,
      maxPrice
    });
  }
  //Shop -- handling filter events
  handleChange = evt => {
    const type = evt.target.type;
    const name = evt.target.name;
    const value = type === "checkbox" ? evt.target.checked : evt.target.value;
    console.log(` type: ${type}, name: ${name}, value: ${value}`);
    this.setState(
      {
        [name]: value
      },
      this.filterProducts
    );
  };
  // Shop -- filtering products
  filterProducts = () => {
    let { products, origin, maxPrice, price, sortedByPrice } = this.state;

    let copy = [...products];
    price = price && parseInt(price);
    //filtering by origin
    if (origin !== "all") {
      copy = copy.filter(item => item.origin === origin);
    }
    // filtering by price
    if (maxPrice) {
      copy = copy.filter(item => item.price <= price);
    }
    //sorting by price
    if (sortedByPrice) {
      copy = copy.sort((a, b) => {
        return a.price - b.price;
      });
    }
    // setting state
    this.setState({
      filteredProducts: copy
    });
  };

  // Shop -- adding to cart
  add = prod => {
    this.setState(state => {
      let cartItems = [...this.state.cart];
      let AlreadyInCart = false;
      cartItems.forEach(item => {
        if (item.name === prod.name) {
          AlreadyInCart = true;
          prod.quantity = ++prod.quantity;
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
// Shop -- redirecting to single product page
  getProduct = product => {
    let tempProducts = [...this.state.products];
    const prod = tempProducts.find(prod => prod.name === product);
    return prod;
  };
  
  //Basket -- removing all
  remove = () => {
    this.setState({
      cart: []
    });
  };

  // Basket -- changing the number of products
  changeQuantity = (prod, actionType) => {
    this.setState(state => {
      let cartItems = [...state.cart];
      cartItems.forEach(item => {
        if (item.name === prod.name && actionType === "+") {
          prod.quantity = ++prod.quantity;
        } else if (item.name === prod.name && actionType === "-") {
          prod.quantity > 0 && --prod.quantity;
          prod.quantity === 0 && cartItems.splice(cartItems.indexOf(prod), 1);
        }
      });
      return {
        cart: cartItems
      };
    });
  };

  //Basket -- handling promo code
  handlePromo = val => {
    if (val.toLowerCase() === "promo") {
      console.log("valid promo code");
      this.setState({
        promoCode: true
      });
    }
  };

// rendering the ContextProvider
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
          add: this.add,
          remove: this.remove,
          changeQuantity: this.changeQuantity,
          handleChange: this.handleChange,
          getProduct: this.getProduct,
          handlePromo: this.handlePromo
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

const ContextConsumer = Context.Consumer;

export { Context, ContextProvider, ContextConsumer };
