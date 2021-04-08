import React, { Component } from 'react';
import { Link, Router } from 'react-router-dom';
import './index.less';


export default class Header extends Component {

    constructor(props) {

        super(props);

        this.state = {
            isLogin: false,
            username: ''
        }
    }


    render() {
        return(
            <div className="HeaderWrapper">
                <div className="HeaderLeft">仓山刘木匠家具</div>
                <div className="HeaderContent"></div>
                <div className="HeaderRight">
                    {
                        this.state.isLogin ? <span>{this.state.username}</span> :  
                            <Link to="/login" style={{color: '#fff'}}>未登录，请先去登录</Link>
                    }
                </div>
            </div>
        )
    }
}
