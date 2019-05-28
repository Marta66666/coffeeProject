import React from 'react';
import {ContextConsumer} from '../Context/Context'
import {  NavLink} from "react-router-dom";

const Product = ({product, cart}) => {
    const {name, price} = product;
    
 
    return (
        <ContextConsumer>
            { ({add}) => (
        <div className="Product">
             <NavLink activeStyle = {{color: 'white'}} to={`/shop/${name}`}> 
            <div className="Product-img"></div>
            <div className="Product-text-overlay"></div>
            <div className="Product-text"><h2 className="Product-title">{name}</h2><p className="Product-price">{price}$</p></div>
        
            </NavLink>
            <button className="Product-btn" onClick={()=>add(product)}><i className="material-icons">
                add_shopping_cart
            </i></button>
            {/*<button className="Product-btn-2"><i className="material-icons">*/}
            {/*    favorite_border*/}
            {/*</i></button>*/}
          
        </div>
            )}
        </ContextConsumer>
    )
}

export default Product