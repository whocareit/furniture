import React, { Component } from 'react';
import './index.less';

export default class Service extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        const { content } = this.props;
        return(
            <div className="service">
                <div className="ContentBodyLine">{content}</div>
                <div className="ContentBodyContent">
                    <div style={{marginLeft: '20px', fontSize: '16.5px'}}>售后服务：</div>
                    <div style={{margin: '10px 0 0 20px'}}>1、所有本公司售出的产品均享受八年保修；</div>
                    <div style={{margin: '10px 0 0 20px'}}>2、在接到客户商品的咨询和投诉电话后，本公司将二十四小时内给予电话明确回复；</div>
                    <div style={{margin: '10px 0 0 20px'}}>3、在授权经销商所在地区的，售后服务人员将在二十四小时内做出响应；在授权经销
                        商周边县市的，将在三天内做出响应；属跨省市的，将在七天内做出响应。若问题特殊，
                        无法在短时间内解决的，将在三十六小时内做出合理解释并明确解决时间及方案。
                    </div>
                </div>
            </div>
        )
    }
}