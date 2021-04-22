import React, { Component } from 'react';
import { labelList } from './config';
import { connect } from 'react-redux';
import New from './pages/new';
import Order from './pages/order';
import Service from './pages/service';
import Display from './pages/display';
import About from './pages/about';

import './index.less';


class Content extends Component {

    constructor(props){
        super(props);
        this.state={
            label: ['公司介绍','发展历程'],
            listStatus: 0,
            distance: 0
        }

        this.renderContent = this.renderContent.bind(this);
    }


    renderContent(index, content, listStatus) {
        const label = `${content.title} > ${content.label[listStatus]}`
        switch(index) {
            case 0:
                return <New content={label} listStatus={listStatus} />;
            case 1: 
                return <Display content={label} listStatus={listStatus} />;
            case 2: 
                return <Order content={label} listStatus={listStatus} />;
            case 3:
                return <Service content={label} listStatus={listStatus} />;
            case 4:
                return <About content={label} listStatus={listStatus} />;
            default: 
                return <New content={label} listStatus={listStatus} />
        }

    }

    render() {
        return(
            <div className="ContentWrapper">
                <div className="ContentBody">
                    <div className="ContentBodyLeft">
                        <div className="ContentList">
                            <div className="ContentListTitle">{labelList[this.props.status].title}</div>
                            {
                                labelList[this.props.status].label.map((item, index) => (
                                    <div 
                                        className={this.state.listStatus === index ? "ContentListItem active" : "ContentListItem"} 
                                        key={`${item}---${index}`}
                                        onClick={() => this.setState({listStatus: index})}
                                    >{item}</div>
                                ))
                            }
                        </div>
                        <div className="ContentContactUs">
                            <div className="ContentListTitle">联系我们</div>
                            <div className="ContentContactUsSpan">仓山帅木匠家具</div>
                            <div className="ContentContactUsSpan">联系人: 刘先生</div>
                            <div className="ContentContactUsSpan">联系电话: 13890250735</div>
                            <div className="ContentContactUsSpan">地址: 中江县仓山镇新农贸市场大门口右侧</div>
                        </div>
                    </div>
                    <div className="ContentBodyRight">
                        {
                            this.renderContent(this.props.status, labelList[this.props.status], this.state.listStatus)
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.status
    }

}

export default connect(mapStateToProps, null)(Content)