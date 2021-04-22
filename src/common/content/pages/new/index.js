import React, { Component } from 'react';
import lunbo from '../../../../asset/lunbo.jpg';
import banner from '../../../../asset/banner.jpg';
import { getCarousel, getCurImg, getSaleImg } from '../../../../api/front';
import { cloneDeep } from 'lodash';
import { Card } from 'antd';

import './index.less';

const { Meta } = Card;

export default class New extends Component {

    constructor(props) {
        super(props);
        this.state = {
            distance: 0,
            contentDisplay: []
        }

        this.lunBoRef = React.createRef()
    }

    componentDidMount() {
        
        const display = [
            {
                lunbo: [],
                content: []
            },
            {
                lunbo: [],
                content:[]
            }
        ]

        this.initData(display);
        
        this.timerID = setInterval(
        () => {
            
            if(this.state.distance <= -100) {
                
                this.setState({
                    distance: 0
                })
                this.lunBoRef.current.style.transition = ""

            } else {
                this.setState({
                    distance: this.state.distance - 100
                })
                this.lunBoRef.current.style.transition ="left 2s linear"
            }
        },
        4000
        );

    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    initData = (display) => {
        //轮播图片加载
        getCarousel().then(res => {
            const { errno, data } = res;
            const cur = [], newArr = []
            if (errno === 0) {
                const lunbo1 = cloneDeep(data.result[0]);
                for(let item in lunbo1) {
                    cur.push(lunbo1[item]);
                }
                const lunbo2 = cloneDeep(data.result[1]);
                for(let item in lunbo2) {
                    newArr.push(lunbo2[item]);
                }
                display[0].lunbo = cloneDeep(cur);
                display[1].lunbo = cloneDeep(newArr);
                this.setState({
                    contentDisplay: cloneDeep(display)
                })
            } 
        })

        //获取当季新品
        getCurImg().then(res => {
            const { errno, data } = res;
            if (errno === 0) {
                const cur = [];
                const content1 = cloneDeep(data.result);
                content1.forEach(item => {
                    const newItem = {
                        src: item.img_url,
                        title: item.text_title,
                        description: item.text_desc
                    }
                    cur.push(newItem);
                })
                display[0].content = cloneDeep(cur);
                this.setState({
                    contentDisplay: cloneDeep(display)
                })
            } 
        })

        //获取热销产品
        getSaleImg().then(res => {
            const { errno, data } = res;
            if (errno === 0) {
                const cur = [];
                const content1 = cloneDeep(data.result);
                content1.forEach(item => {
                    const newItem = {
                        src: item.img_url,
                        title: item.text_title,
                        description: item.text_desc
                    }
                    cur.push(newItem);
                })
                display[1].content = cloneDeep(cur);
                this.setState({
                    contentDisplay: cloneDeep(display)
                })
            } 
        })

    }

    render(){
        const { content, listStatus } = this.props;
        const { distance, contentDisplay } = this.state;

        return(
            <div className="new">
                <div className="ContentBodyLine">{content}</div>
                <div className="ContentBodyRightLunBoWrapper">
                    <div className="ContentBodyRightLunBo" 
                        style={{left: `${distance}%`}} 
                        ref={this.lunBoRef}
                    >
                        {
                            contentDisplay && contentDisplay[listStatus] && contentDisplay[listStatus].lunbo.map((item, index) => (
                                <div style={{width: '100%',height: '100%'}} key={`${index}-${item}`}>
                                    <img style={{width: '100%',height: '100%'}} src={item} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="ContentBodyDisplay">
                    <div className="ContentBodyDisplayContainer">
                    {
                        contentDisplay && contentDisplay[listStatus] && contentDisplay[listStatus].content.map((item, index) => (
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