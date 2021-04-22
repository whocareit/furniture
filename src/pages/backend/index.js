import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Carousel } from 'antd';

import  BackendHeader  from '../../common/backend_header';

import Issue from './pages/issue';
import OrderFurniture from './pages/order_furniture';
import Complete from './pages/order_manage/complete';
import UnComplete from './pages/order_manage/uncomplete';
import Display from  './pages/display';
import CarouselManege from './pages/new';
import Profit from './pages/data_detail/profit';
import Recommend from './pages/data_detail/recommond';

import './index.less'

import renderSideContent, { sideConfig } from './config';

const {  Content, Footer, Sider } = Layout;

class Backend extends Component {

    constructor() {
        super();
        this.state = {
            collapsed: false,
            current: '0',
            parent: '出单',
            child: ''
        };
        
    }

    onCollapse = (collapsed, type) => {
        this.setState({
            collapsed: collapsed
        })
    }

    //点击改变面包屑效果
    handleClick = ({item, key}) => {

        const allDeal = key.split(',');
        const index = parseInt(allDeal[0])
        if(allDeal[0]) {
            this.setState({
                parent: sideConfig[index].title
            })
        }
        if(allDeal[1]){
            const title = sideConfig[index].child[allDeal[1]].title
            this.setState({
                child: title 
            })
        } else {
            this.setState({
                child: ''
            })
        }
        this.setState({
            current: key
        })
        
    }

    renderContent = () => {
        const { current } = this.state;
        switch(current) {
            case '0' : 
                return <Issue />
            case '1' :
                return <OrderFurniture />
            case '2order,0' :
                return <UnComplete />
            case '2order,1' :
                return <Complete />
            case '3' :
                return <Display />
            case '4' :
                return <CarouselManege />
            case '5data,0' :
                return <Profit />
            case '5data,1' :
                return <Recommend />
        }
    }

    render() {
        const { current, parent, child } = this.state;
        return(
            <Layout style={{minHeight: '100vh'}}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={(collapsed, type) => this.onCollapse(collapsed, type)}>
                    <div className="tableLogo" style={{color: '#fff'}}>某某家具后台管理系统</div>
                    <Menu theme="#1DA57A"  onClick={this.handleClick} selectedKeys={[current]} mode="inline">
                        {renderSideContent()}
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <BackendHeader  style={{ padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>{parent}</Breadcrumb.Item>
                            <Breadcrumb.Item>{child}</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, minWidth: 1200 }}>
                            {this.renderContent()}
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>liu hu design</Footer>
                </Layout>
            </Layout>
        )
    }

}


export default Backend;