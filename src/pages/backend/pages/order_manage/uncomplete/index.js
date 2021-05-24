import React, { Component } from 'react';
import { Table, Space, Button, notification} from 'antd';
import { cloneDeep } from 'lodash';
import { 
    getComplete,
    changeStatue,
    deleteOrder
} from '../../../../../api/order';
import './index.less';
import { connect } from 'react-redux';
import { type } from '../../../../../redux/action';


class UnComplete extends Component {
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
        getComplete(params).then(res => {
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

    handleChangeStatus = (record) => {
        const { order_id } = record;
        const { pageSize, current } = this.state.pagination;
        changeStatue({order_id}).then(res => {
            const { errno, data } = res;
            if(errno === 0) {
                notification.success({
                    message: data.info
                })
                this.dealReq({current, pageSize});
            } else {
                notification.error({
                    message: data.info
                })
            }
        })
    }

    handleDeleteOrder = (record) => {
        const { key } = record;
        const { pageSize, current } = this.state.pagination;
        deleteOrder({key}).then(res => {
            const { errno, data } = res;
            if(errno === 0) {
                notification.success({
                    message: data.info
                })
                this.dealReq({current, pageSize});
            } else {
                notification.error({
                    message: data.info
                })
            }
        })
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
            },
            {
                title: '操作',
                key: 'action',
                render: (record) => (
                    <Space>
                        <Button type="primary" onClick={() => this.handleChangeStatus(record)}>完成</Button>
                        <Button type="primary" onClick={() => this.handleDeleteOrder(record)}>删除</Button>
                        <Button type="primary" onClick={() => this.props.getOrderDetail(record.key)}>订单详情</Button>
                    </Space>
                )
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

const mapDispatchToProps = (dispatch) => {
    return {
        getOrderDetail: (detail) => dispatch({
                type: type.ORDER_DETAIL,
                detail
            })
        
    }
}

export default connect(null, mapDispatchToProps)(UnComplete);