import React, { Component } from 'react';
import './index.less';

export default class About extends Component {

    constructor(props) {
        super(props);
    }

    render(){
        const { content } = this.props;
        return(
            <div className="about">
                <div className="ContentBodyLine">{content}</div>
                <div className="ContentBodyContent">
                    <div style={{marginLeft: '20px', fontSize: '16.5px'}}>帅家具：</div>
                    <div className="ContentBodyDesc" >先来简要介绍一下什么是MPEG2-TS吧。MPEG2格式大
                        家都通过对DVD的接触而多多少少了解了一些，DVD节目中的MPEG2格式，确切地说是MPEG2-PS，全称
                        是Program Stream，而TS的全称则是Transport Stream。MPEG2-PS主要应用于存储的具有固定时长的
                        节目，如DVD电影，而MPEG-TS则主要应用于实时传送的节目，比如实时广播的电视节目。这两种格式的主要
                        区别是什么呢？简单地打个比喻说，你将DVD上的VOB文件的前面一截cut掉（或者干脆就是数据损坏），那么就
                        会导致整个文件无法解码了，而电视节目是你任何时候打开电视机都能解码（收看）的，所以，MPEG2-TS格
                        式的特点就是要求从视频流的任一片段开始都是可以独立解码的。
                    </div>
                </div>
            </div>
        )
    }
}