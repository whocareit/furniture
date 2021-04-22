import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.less';

class BackendHeader extends Component {

    constructor() {
        super()
    }

    render() {
        return(
            <div className="headerWrapper">
                <div className="headerTitle">
                    <Link to='/'>跳转至前台</Link>
                </div>
            </div>
        )
    }
}

export default BackendHeader;