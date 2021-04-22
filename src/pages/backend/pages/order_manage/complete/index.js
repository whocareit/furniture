import React, { Component } from 'react';
import { Table } from 'antd';
import { getIncomplete } from '../../../../../api/order';
import './index.less'
import { cloneDeep } from 'lodash';

class Complete extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: [],
            pagination: {}
        }
    }

    componentDidMount() {
        //加载dataSource
        this.dealReq({current: 1, pageSize: 5});
    }


    dealReq = (params) => {
        getIncomplete(params).then(res => {
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

    handlePage = (pagination) => {
        const { pageSize, current } = pagination
        this.dealReq({ current, pageSize})
    }

    render() {
        const columns = [
            {
                title: '订单号',
                dataIndex: 'order_id',
                key: 'order_id'
            },
            {
                title: '日期',
                dataIndex: 'date',
                key: 'date'
            },
            {
                title: '开单人',
                dataIndex: 'person',
                key: 'person'
            },
            {
                title: '客户名',
                dataIndex: 'client_name',
                key: 'client_name'
            },
            {
                title: '客户地址',
                dataIndex: 'client_adds',
                key: 'client_adds'
            },
            {
                title: '客户电话',
                dataIndex: 'client_phone',
                key: 'client_phone'
            },
            {
                title: '总额',
                dataIndex: 'price',
                key: 'price'
            },
            {
                title: '定金',
                dataIndex: 'order_price',
                key: 'order_price'
            },
            {
                title: '下欠金额',
                dataIndex: 'result_price',
                key: 'result_price'
            }
        ]

        return(
            <div>
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

export default Complete;