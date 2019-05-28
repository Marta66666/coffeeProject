import React, { Component } from "react";
import { Context, ContextConsumer } from "../Context/Context";
const uuidv4 = require("uuid/v4");

class FilteredProducts extends Component {
  static contextType = Context;
  //get unique values
  getUnique = (prod, value) => {
    return [...new Set(prod.map(prod => prod[value]))];
  };
  render() {
    let { products } = this.context;
    let types = this.getUnique(products, "origin");
    types = ["all", ...types];
    // console.log(types)
    let arr = types.map((prod, i) => {
      // console.log(uuidv4());
      return (
        <option value={prod} key={uuidv4()}>
          {prod}
        </option>
      );
    });
    return (
      <ContextConsumer>
        {({ handleChange, origin, maxPrice, price, minPrice, sortedPrice }) => (
          <>
            <form className="form">
              <div>
                <label htmlFor="origin">country of origin</label>
                <select
                  name="origin"
                  id="origin"
                  value={origin}
                  onChange={handleChange}
                >
                  {arr}
                </select>
                <div />
              </div>
              <div>
                <label htmlFor="price">price {price}</label>
                <input name="price" type="range" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} ></input>
              </div>
              <div>
                <label htmlFor="sortedPrice">sort by price</label>
                <input checked = {sortedPrice} name="sortedPrice" type="checkbox"  id="sortedPrice"  onChange={handleChange} ></input>
              </div>
            </form>
          </>
        )}
      </ContextConsumer>
    );
  }
}

export default FilteredProducts;
