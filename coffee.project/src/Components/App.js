import React, { Component } from "react";
import { HashRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Error from "./Error";
import Shop from "./Shop";
import Cart from "./Cart";
import SingleProduct from "./SingleProduct";
import "../scss/main.scss";

class App extends Component {
  state = {
    menuOpen: false
  };

  handleHamburgerChange = () => {
    this.setState({
      menuOpen: !this.state.menuOpen
    });
  };

  closeMenu = () => {
    this.setState({
      menuOpen: this.state.menuOpen && false
    });
  };

  render() {
    return (
      <Router>
        <nav className="App_nav">
          <div
            className="hamburger-container"
            onClick={this.handleHamburgerChange}
          >
            <span className={`${this.state.menuOpen && "disappear"}`} />
            <span/>
            <span className={`${this.state.menuOpen && "disappear"}`} />
          </div>
          <NavLink to="/cart">
            <i
              onClick={this.closeMenu}
              className="material-icons shopping-cart"
            >
              shopping_cart
            </i>
          </NavLink>
          <ul className={`nav-links ${this.state.menuOpen && "open"}`}>
            <li>
              <NavLink onClick={this.handleHamburgerChange} exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink onClick={this.handleHamburgerChange} to="/shop">
                go to shop
              </NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/shop" component={Shop} />
          <Route path="/shop/:product" component={SingleProduct} />
          <Route exact path="/cart" component={Cart} />
          <Route component={Error} />
        </Switch>
      </Router>
    );
  }
}

export default App;
