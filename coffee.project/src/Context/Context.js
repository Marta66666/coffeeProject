import React, { Component } from "react";
import items from "../fakeDatabase/data";

const Context = React.createContext();

class ContextProvider extends Component {
  state = {
    products: [


    ],
    filteredProducts: [],
    cart: [ ],
    origin: "all",
    price: 0,
    maxPrice: 0,
    minPrice: 0,
    sortedPrice: false,
    discount: false
  };
// handling filter eventts
  handleChange = evt => {
    const type = evt.target.type;
    const name = evt.target.name;
    const value = type === 'checkbox' ? evt.target.checked : evt.target.value;
    console.log(` type: ${type}, name: ${name}, value: ${value}`);
    this.setState({
      [name]: value
    }, this.filterProducts);
  };
  // handlePromoCode = evt => {
  //   this.setState({
  //     promoCode: evt
  //   }) 
  //   if (evt === 'promo'){
  //     console.log('valid promo code');
  //     this.setState({
  //        open: true
  //     }) }
  //     else {
  //       this.setState({
  //         open: false
  //       }) 
      
  //   }
  // }

  // giveDiscountHandler = () => {
  //   if (this.state.promoCode === 'DISCOUNT') {

  //       this.setState(function() {
  //         this.setState({
  //           disablePromoButton: true
  //         });
  //       }
  //   )}
  // };
  filterProducts = () => {
    let {
      products, origin, maxPrice, price, sortedPrice
    } = this.state;
    let copy = [...products];
    price = price && parseInt(price);
    console.log(price);
    if (origin !== 'all'){
      copy = copy.filter(item => item.origin === origin)
    }
    // filtering by price
    if(maxPrice){
      copy = copy.filter(item => item.price <= price);
    }
    //sorting by price 
    if(sortedPrice){
      copy = copy.sort((a,b) => { return a.price-b.price})
    }
    // setting state
    this.setState({
      filteredProducts: copy,
    })
    
    
  };
  // cart discount 
  // applyDiscount = (discount = 1) => {
  //   if(this.state.open){
  //     this.setState({
  //       open : false
  //     })
  //   let sum;
  //   sum = this.state.cart.reduce((acc,curr) => {
  //     return acc + curr.price
  //   }, 0);
  //   sum = sum * discount;
  //   sum = sum.toFixed(2)
  //   this.setState({
  //    sum
  //   })
  // }
  // }


  
//mounting & formatting
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

  getRoom = slug => {
    let tempRooms = [...this.state.products];
    const room = tempRooms.find(room => room.name === slug);
    return room;
  };
// handlePromo
handlePromo = (val) => {
  if(val === "promo")
  {console.log('valid promo code')
this.setState({
  promoCode: true
}

)
}
}
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
          handleChange: this.handleChange,
          getRoom: this.getRoom,
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
