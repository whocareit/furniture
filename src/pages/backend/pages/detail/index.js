import React, { Component } from 'react';
import { Table, Space, Button, notification} from 'antd';
import { cloneDeep } from 'lodash';
import {
    getOrderDetail
} from '../../../../api/order';
import './index.less';
import { connect } from 'react-redux';
import { type } from '../../../../redux/action';


class Detail extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
            pagination: {}
        }
    }

    componentDidMount() {
        this.downloadData({detail: this.props.detail, current: 1, pageSize: 5});
    }


    downloadData = (params) => {
        getOrderDetail(params).then(res => {
            const { errno, data } = res;
            if(errno === 0 ) {
                const { result, current, pageSize, total } = data;
                const newArr = []
                result.forEach(item => {
                    const { status, ...output } = item;
                    item = {
                        ...output,
                        key: output.order_id
                    }
                    newArr.push(item);
                })
                
                this.setState({
                    pagination: {
                        current, 
                        pageSize, 
                        total
                    },
                    dataSource: cloneDeep(newArr)
                })
            }
        })
    }


    render() {
        const columns = [
            {
                title: '名字',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '颜色',
                dataIndex: 'color',
                key: 'color'
            },
            {
                title: '单位',
                dataIndex: 'unit',
                key: 'unit'
            },
            {
                title: '数量',
                dataIndex: 'number',
                key: 'number'
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: '额外描述',
                dataIndex: 'extra',
                key: 'extra'
            }
        ]

        return(
            <div>
                <Button type="primary" style={{marginBottom: '10px'}} onClick={() => this.props.getOrderDetail('')}>返回</Button>
                <Table 
                    columns={columns} 
                    dataSource={this.state.dataSource} 
                    pagination={this.state.pagination}
                    onChange={this.handlePage}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        detail: state.detail
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getOrderDetail: (detail) => dispatch({
                type: type.ORDER_DETAIL,
                detail
            })
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail);