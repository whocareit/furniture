import React, { Component, Fragment } from 'react';
import Header from '../../common/header';
import Content from '../../common/content';


export default class Display extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <Fragment>
              <Header />
              <Content />
            </Fragment>
        )
    }
}
