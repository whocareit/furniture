import React, { Component } from 'react';
import Header from '../header';


export default class Display extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div>
              <Header />
            </div>
        )
    }
}
