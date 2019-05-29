import React, {Component} from 'react';
import {Context} from '../Context/Context'



class SingleProduct extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.product);
        this.state = {
          product: this.props.match.params.product,
        };
      }
      static contextType = Context;
    
      componentDidMount() {
        console.log(this.props);
      }
    render() {
        const { getProduct } = this.context;
        const product = getProduct(this.state.product);
        console.log(product)
        if (product){
        return (
            <p>{product.name}</p>
        );
        } else {
            return <p>problem</p>
        }
    }
}

export default SingleProduct;


