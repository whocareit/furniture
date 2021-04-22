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
import { getDisplayList, addDisplayList, editDisplayList } from '../../../../api/display';
import { cloneDeep } from 'lodash';
import './index.less'

const product_tag = {
    0: '普通商品',
    1: '热销产品',
    2: '当季新品'
}

const product_type = {
    0: '床',
    1: '沙发',
    2: '餐桌',
    3: '衣柜'
}

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 20, span: 4 },
};

class Display extends Component {
    constructor() {
        super();
        this.state = {
            initialValues: {},
            visible: false,
            dataSource: [],
            pagination: {}
        }
    }

    componentDidMount() {
        this.getDisplayListData({current: 1, pageSize: 5})
    }

    getDisplayListData = (params) => {
        getDisplayList(params).then(res => {
            const { errno, data } = res;
            if(errno === 0 ) {
                const { result, current, pageSize, total } = data;
                const newArr = []
                result.forEach(item => {
                    const { display_id, ...output } = item;
                    item = {
                        ...output,
                        key: display_id
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
            visible: true,
            initialValues: record
        })
    }

    handlePage = (values) => {
        const { current, pageSize } = values;
        this.getDisplayListData({ current, pageSize });
    }

    submitForm = (value) => {
        const { initialValues, pagination } = this.state;
        if(Object.keys(initialValues).length > 0) {
            const { key } = initialValues;
            editDisplayList({...value, key}).then(res => {
                const { errno, data } = res;
                if(errno === 0) {
                    notification.success({
                        message: data.info
                    })
                    this.getDisplayListData(pagination);
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
            addDisplayList({...value}).then(res => {
                const { errno, data } = res;
                if(errno === 0) {
                    notification.success({
                        message: data.info
                    })
                    this.getDisplayListData(pagination);
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

    render() {
        const { visible, dataSource, pagination, initialValues } = this.state;
        const isEdit = Object.keys(initialValues).length > 0;
        const columns = [
            {
                title: '型号',
                dataIndex: 'text_title',
                key: 'text_title'
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
                render: (value) => (
                    <div style={{width: '100%'}}>{value}</div>
                )
            },
            {
                title: '产品类型',
                dataIndex: 'product_type',
                key: 'product_type',
                render: (value) => (
                    <div>{product_type[value]}</div>
                )
            },
            {
                title: '产品标签',
                dataIndex: 'tag',
                key: 'tag',
                render: (value) => (
                    <div>{product_tag[value]}</div>
                )
                    
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
                            label="型号"
                            name="text_title"
                            rules={[{ required: true, message: '请输入型号' }]}
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
                            label="产品类型"
                            name="product_type"
                            rules={[{ required: true, message: '请输入产品类型' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="产品标签"
                            name="tag"
                            rules={[{ required: true, message: '请输入产品标签' }]}
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

export default Display;