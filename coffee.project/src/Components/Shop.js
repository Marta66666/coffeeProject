import React from 'react';
import {Context} from '../Context/Context';
import Product from "./Product";
import FilterProducts from './FilterProducts';
import {NavLink} from 'react-router-dom';
class Shop extends React.Component  {
    static contextType = Context;


render() {
        let {products,
            filteredProducts,
             
             cart} = this.context;

        return (
            <div className="Shop">
              <FilterProducts/>

                {filteredProducts.map(product => <Product  key={product.id} product={product} cart={cart} add={()=> this.addToCart(product)}/>)}

            </div>
        )
    }
}

export default Shop;
