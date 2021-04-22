import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './index.less';
import { type } from '../../redux/action';


class Header extends Component {

    constructor(props) {

        super(props);

        this.state = {
            status: 0,
            label: ['新品上市', '商品展示', '定制家具', '服务流程', '关于我们' ],
        }

        this.getCurIndex = this.getCurIndex.bind(this);
    }


    componentDidMount() {
        
        const token = localStorage.getItem('token')

        const username = localStorage.getItem('username')
        if(token) {
            this.props.setLogin(true)
            console.log(this.props)
            this.props.setUserName(username)
        }

    }

    getCurIndex(index) {
        this.props.setStatus(index);
        this.setState({status: index})

    }


    render() {
        return(
            <div className="HeaderWrapper">
                <div className="HeaderLeft">仓山帅木匠家具</div>
                <div className="HeaderContent">
                   {
                       this.state.label.map((item, index) => (
                           <div 
                            style={{cursor: 'pointer'}}
                            className={this.state.status === index ? "HeaderList": ""} 
                            key={`${item}-${index}`}
                            onClick={() => this.getCurIndex(index)}
                        >
                               {item}
                           </div>
                       ))
                   }
                </div>
                <div className="HeaderRight">
                    {
                        this.props.isLogin ? (<div>
                            <div style={{width: "100%", textAlign: 'center'}}>
                                {this.props.username}
                            </div> 
                            <Link to='/backend' style={{color: '#fff'}}><div style={{width: "100%", textAlign: 'center'}}>切换到管理后台</div></Link>
                        </div>):  
                            <div style={{width: '100%', textAlign: 'center'}}>
                                <Link to="/login" style={{color: '#fff'}}>未登录，请先去登录</Link>
                            </div>
                    }
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        isLogin: state.isLogin,
        username: state.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLogin: (isLogin) => dispatch({
            type: type.IS_LOGIN,
            isLogin
        }),
        setUserName: (username) => {
            dispatch({
                type: type.SET_USERNAME,
                username
            })
        },
        setStatus: (status) => {
            dispatch({
                type: type.SET_STATUS,
                status
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);