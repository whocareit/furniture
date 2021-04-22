import React, { Component } from 'react';
import { getBedImg, getSofaImg, getTableImg, getWardrobeImg } from '../../../../api/front';
import { Card } from 'antd';
import { cloneDeep } from 'lodash';
import './index.less';

const { Meta } = Card;

export default class Display extends Component {

    constructor(props) {
        super(props);
        this.state={
            contentDisplay: []
        }
    }

    componentDidMount() {
        const display = []
        this.initData(display)
    }

    initData = (display) => {

        getBedImg().then(res => {
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

        getSofaImg().then(res => {
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
                display[1] = cloneDeep(cur);
                this.setState({
                    contentDisplay: cloneDeep(display)
                })
            }
        })

        getTableImg().then(res => {
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
                display[2] = cloneDeep(cur);
                this.setState({
                    contentDisplay: cloneDeep(display)
                })
            }
        })

        getWardrobeImg().then(res => {
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
                display[3] = cloneDeep(cur);
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
            <div className="display">
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