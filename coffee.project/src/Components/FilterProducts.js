import React, { Component } from "react";
import { Context, ContextConsumer } from "../Context/Context";

class FilteredProducts extends Component {
  static contextType = Context;
  //get unique values 
getUnique = (prod, value) => {
  return [...new Set(prod.map(prod => prod[value]))]
}
  render() {
    let { products } = this.context;
    let types = this.getUnique(products, 'origin');
    types = ['all', ...types];
    // console.log(types)
  let arr = types.map((prod, i) =>  { return <option value = {prod}key={i}>{prod}</option>})
    return (
      <ContextConsumer>
        {({ handleChange, origin, maxPrice }) => (
        <>
        <form>
            <div>
                <label htmlFor="origin">country of origin</label>
                <select name="origin" id = "origin" value = {origin} onChange={handleChange}>
                  {arr}
                </select>
                <div>
               
                </div>
            </div>
        </form>
        </>
        )}
      </ContextConsumer>
    );
  }
}


export default FilteredProducts;
