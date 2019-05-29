import React, { Component } from "react";
import { Context} from "../Context/Context";
const uuidv4 = require("uuid/v4");


class FilteredProducts extends Component {
  static contextType = Context;
  //get unique values
  getUnique = (prod, value) => {
    return [...new Set(prod.map(prod => prod[value]))];
  };
  render() {
    let { products, handleChange, origin, maxPrice, price, minPrice, sortedByPrice } = this.context;
    let types = this.getUnique(products, "origin");
    types = ["all", ...types];
    // console.log(types)
    let arr = types.map((prod, i) => {
      return (
        <option value={prod} key={uuidv4()}>
          {prod}
        </option>
      );
    });
    return (
          <div className="Filter-container">
            <form className="Filter-form">
              <h3 className="Filter-form-title">Need help searching?</h3>
              <div className="Filter-form-inputs">
              <div className="Filter-container-origin Filter-container-input"> 
                <label className="Filter-label-origin" htmlFor="origin">country of origin</label>
                <select
                  name="origin"
                  className="Filter-select-origin"
                  id="origin"
                  value={origin}
                  onChange={handleChange}
                >
                  {arr}
                </select>
              </div>
              <div className="Filter-container-priceRange Filter-container-input">
                <label className="Filter-label-priceRange" htmlFor="price">price </label>
                <span className="Filter-price-priceRange">${price}</span>
                <input className="Filter-input-priceRange" name="price" type="range" min={minPrice} max={maxPrice} id="price" value={price} onChange={handleChange} ></input>
    
              </div>
              <div className="Filter-container-priceSort Filter-container-input">
                <label htmlFor="sortedByPrice" className="Filter-label-priceSort">sort by price</label>
                <input className="Filter-input-priceSort" checked = {sortedByPrice} name="sortedByPrice" type="checkbox"  id="sortedByPrice"  onChange={handleChange} ></input>
              </div>
              </div>
            </form>
          </div>
        )}
  }


export default FilteredProducts;
