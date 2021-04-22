import React, { Component } from 'react';
import lunbo from '../../../../asset/lunbo.jpg';
import { getOrderFurniture } from '../../../../api/front';
import { Card } from 'antd';
import { cloneDeep } from 'lodash';

import './index.less';

const { Meta } = Card;

export default class Order extends Component {

    constructor(props) {
        super(props);
        this.state={
            contentDisplay: []
        }
    }

    componentDidMount() {
        const display = [
            
                [
                    {src: lunbo, title: '"Europe Street beat', description: 'description' },
                    {src: lunbo, title: '"Europe Street beat', description: 'description' },
                    {src: lunbo, title: '"Europe Street beat', description: 'description' },
                    {src: lunbo, title: '"Europe Street beat', description: 'description' },
                    {src: lunbo, title: '"Europe Street beat', description: 'description' },
                    {src: lunbo, title: '"Europe Street beat', description: 'description' },
                    {src: lunbo, title: '"Europe Street beat', description: 'description' },
                    {src: lunbo, title: '"Europe Street beat', description: 'description' },
                    {src: lunbo, title: '"Europe Street beat', description: 'description' },
                    {src: lunbo, title: '"Europe Street beat', description: 'description' },
                    {src: lunbo, title: '"Europe Street beat', description: 'description' },
                    {src: lunbo, title: '"Europe Street beat', description: 'description' },
                ]
            
        ]

        this.initData(display)
        
    }
    
    initData = (display) => {
        getOrderFurniture().then(res => {
            const { errno, data } = res;    
            if(errno === 0) {
                const cur = [];
                data.result.forEach(item => {
                    const newItem = {
                        src: item.img_url,
                        title: item.text_title,
                        description: item.text_desc
                    }
                    cur.push(newItem);
                })
                display[0] = cloneDeep(cur);
                this.setState({
                    contentDisplay: cloneDeep(display)
                })
            }
        })
    }

    render(){
        const { content, listStatus } = this.props;
        const { contentDisplay } = this.state;
        return(
            <div className="order">
                <div className="ContentBodyLine">{content}</div>
                <div className="ContentBodyDisplay">
                    <div className="ContentBodyDisplayContainer">
                    {
                        contentDisplay && contentDisplay[listStatus] && contentDisplay[listStatus].map((item, index) => (
                            <div className="ContentBodyDisplayItem"
                                key={`${index}-${item}`}
                            >
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src={item.src} />}
                                >
                                    <Meta title={item.title} description={item.description} />
                                </Card>
                        </div>
                        ))
                    }
                       
                    </div>

                </div>
            </div>
        )
    }
}