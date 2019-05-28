import React, {Component} from 'react';
import {Context} from '../Context/Context'



class SingleProduct extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.slug);
        this.state = {
          slug: this.props.match.params.slug,
        };
      }
      static contextType = Context;
    
      componentDidMount() {
        console.log(this.props);
      }
    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        console.log(room)
        if (room){
        return (
            <p>{room.name}</p>
        );
        } else {
            return <p>problem</p>
        }
    }
}

export default SingleProduct;


