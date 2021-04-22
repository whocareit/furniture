import React, { Component } from 'react';
import { 
    Space, 
    Button, 
    Table,
    Drawer,
    Input,
    Form,
    notification
} from 'antd';
import { getOrderFurniture, addOrderFurniture, editOrderFurniture } from '../../../../api/order';
import { cloneDeep } from 'lodash';
import './index.less'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 20, span: 4 },
};

class OrderFurniture extends Component {

    constructor() {
        super();
        this.state={
            visible: false,
            dataSource: [],
            pagination: {},
            initialValues: {}
        }
    }

    componentDidMount() {
        this.dealReq({current: 1, pageSize: 5})
    }
    
    dealReq = (params) => {
        getOrderFurniture(params).then(res => {
            const { errno, data } = res;
            if(errno === 0 ) {
                const { result, current, pageSize, total } = data;
                const newArr = []
                result.forEach(item => {
                    const { order_furniture_id, ...output } = item;
                    item = {
                        ...output,
                        key: order_furniture_id
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

    handleEditOrder = (record) => {

        this.setState({
            initialValues: record,
            visible: true
        })

    }

    submitForm = (value) => {
        const { pagination, initialValues } = this.state;

        if (Object.keys(initialValues).length > 0) {
            //编辑
            const { key } = initialValues;
            editOrderFurniture({...value, key}).then(res => {
                const { errno, data } = res;
                if(errno === 0) {
                    notification.success({
                        message: data.info
                    })
                    this.dealReq(pagination);
                } else {
                    notification.error({
                        message: data.info
                    })
                }
                this.setState({
                    visible: false,
                    initialValues: {}
                })
            })
        } else {
            //新增
            addOrderFurniture({...value}).then(res => {
                const { errno, data } = res;
                if(errno === 0) {
                    notification.success({
                        message: data.info
                    })
                    this.dealReq(pagination);
                } else {
                    notification.error({
                        message: data.info
                    })
                }
                this.setState({
                    visible: false
                })
            })
        }
        
    }

    handlePage = (pagination) => {
        const { pageSize, current } = pagination
        this.dealReq({ current, pageSize})
    }

    render() {
        const { visible, dataSource, pagination, initialValues } = this.state
        const isEdit = Object.keys(initialValues).length > 0;
        const columns = [
            {
                title: '案例名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '描述',
                dataIndex: 'text_desc',
                key: 'text_desc'
            },
            {
                title: '图片路径',
                dataIndex: 'img_url',
                key: 'img_url',
                width: 300,
                render: (values) => (
                    <div style={{width: '100%'}}>{values}</div>
                )
            },
            {
                title: '地点',
                dataIndex: 'place',
                key: 'place'
            },
            {
                title: '操作',
                key: 'action',
                render: (record) => (
                    <Space>
                        <Button type="primary" onClick={() => this.handleEditOrder(record)}>编辑</Button>
                    </Space>
                )
            }
        ]

        return(
            <div>
                <Button 
                    style={{marginBottom: '10px'}} 
                    type="primary" 
                    onClick={() => this.setState({visible: true})}
                >
                    增加
                </Button>
                <Table 
                    columns={columns} 
                    dataSource={dataSource} 
                    pagination={pagination}
                    onChange={this.handlePage}
                />
                <Drawer
                    title={ isEdit ? "编辑商品" : "添加商品"}
                    placement="right"
                    closable={false}
                    width={400}
                    onClose={() => this.setState({visible: false, initialValues: {}})}
                    visible={visible}
                    destroyOnClose
                >
                    <Form
                        {...layout}
                        name="basic"
                        onFinish={this.submitForm}
                        initialValues={initialValues}
                        
                    >
                        <Form.Item
                            label="案列名称"
                            name="name"
                            rules={[{ required: true, message: '请输入案例名称' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="描述"
                            name="text_desc"
                            rules={[{ required: true, message: '请输入描述' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="图片路径"
                            name="img_url"
                            rules={[{ required: true, message: '请输入图片路径' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="地点"
                            name="place"
                            rules={[{ required: true, message: '请输入地点' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            {...tailLayout} 
                        >
                            <Button type="primary" htmlType="submit">
                                提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        )
    }
}

export default OrderFurniture;