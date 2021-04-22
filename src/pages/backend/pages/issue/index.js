import React, { Component } from 'react';
import { Button, Input, Table, Drawer, Form, Space, notification } from 'antd';
import { cloneDeep } from 'lodash';
import { debounce } from '../../../../utils/debounce';
import { orderSubmit } from '../../../../api/order';

import './index.less'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 20, span: 4 },
};

class Issue extends Component {

    constructor() {
        super();
        this.state={
            orderId: 789781,
            visible: false,
            submitData: {
                dataSource: [],
                year: 2021,
                month: 4,
                day: 10,
                outPerson: '',
                clientName: '',
                clientAdds: '',
                clientPhone: '',
                price: '',
                orderPrice: '',
                resultPrice: '',
                phone: ''
            }
        }
    }
    


    getCurrentYear = (e) => {
        const { submitData } = this.state
        this.setState({
            submitData: {
                ...submitData,
                year: e.target.value,
            }
        })
    }

    getCurrentMonth = (e) => {
        const { submitData } = this.state
        this.setState({
            submitData: {
                ...submitData,
                month: e.target.value,
            }
        })
    }

    getCurrentDate = (e) => {
        const { submitData } = this.state
        this.setState({
            submitData: {
                ...submitData,
                day: e.target.value,
            }
        })
    }

    getCurrentName = (e) => {
        const { submitData } = this.state
        this.setState({
            submitData: {
                ...submitData,
                outPerson: e.target.value,
            }
        })
    }

    getCurrentClientName = (e) => {
        const { submitData } = this.state
        this.setState({
            submitData: {
                ...submitData,
                clientName: e.target.value,
            }
        })
    }

    getCurrentClientAdds = (e) => {
        const { submitData } = this.state
        this.setState({
            submitData: {
                ...submitData,
                clientAdds: e.target.value,
            }
        })
    }


    getCurrentClientPhone = (e) => {
        const { submitData } = this.state
        this.setState({
            submitData: {
                ...submitData,
                clientPhone: e.target.value,
            }
        })
    }

    getCurrentOrderPrice = (e) => {
        const { submitData } = this.state
        this.setState({
            submitData: {
                ...submitData,
                orderPrice: e.target.value,
            }
        })
    }

    getCurrentPhone = (e) => {
        const { submitData } = this.state
        this.setState({
            submitData: {
                ...submitData,
                phone: e.target.value,
            }
        })
    }

    addForm = (values) => {
        const key = new Date().getTime()
        const { submitData } = this.state;
        submitData.dataSource.push({...values, key: key});
        const dataSource = cloneDeep(submitData.dataSource)
        this.setState({
            visible: false,
            submitData: {
                ...submitData,
                dataSource: dataSource
            }
        })
    }

    deleteData = (record) => {
        const { key } = record;
        const { submitData } = this.state;
        const dataSource = submitData.dataSource;
        dataSource.forEach((item, index) => {
            if(item.key === key) {
                dataSource.splice(index, 1);
                index--;
            }
        })
        this.setState({
            submitData: {
                ...submitData,
                dataSource: cloneDeep(dataSource)
            }
        })
        
    }

    submitDataToServer = () => {
        let price = 0;
        const { submitData } = this.state;
        const { dataSource, orderPrice} = submitData;
        dataSource.forEach(item => {
            price += parseInt(item.price)*parseInt(item.number);
        })
        const resultPrice = price - orderPrice;
        const data = {
            ...submitData,
            price,
            resultPrice
        }
        this.setState({
            submitData: {
                ...data
            }
        })
        orderSubmit(data).then(res => {
            const { info } = res.data;
            if(res.errno === 0 ) {
                notification.success({
                    message: info
                })
            } else {
                notification.error({
                    message: info
                })
            }
            
        })
    }

    render() {
        const { orderId, submitData, visible } = this.state;
        const columns = [
            {
                title: '品名型号规格',
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
                title: '备注',
                dataIndex: 'extra',
                key: 'extra'
            },
            {
                title: '操作',
                key: 'action',
                render: (record) => (
                    <Space size="middle" style={{cursor: 'pointer'}} >
                        <span onClick={() => this.deleteData(record)}>删除</span>
                    </Space>
                )
            }
        ]
        return(
            <div className="IssueWrapper">
                <div className="IssueHeader">
                    <div className="logonArea">
                        <div style={{letterSpacing: '1.5px'}}>【免费设计室内装修】</div>
                        <div>【专业青少年儿童家具】</div>
                    </div>
                    <div className="IssueHeaderTitle">
                        <div className="IssueHeaderTitleHeader">某某某某某某某某家具</div>
                        <div className="IssueHeaderTitleLine"></div>
                        <div className="IssueHeaderTitleHeaderEnglish">moumoumoumoumoumoumou</div>
                        <div className="IssueHeaderTitleDes">【 专业套房家私， 室内装修 】</div>
                    </div>
                    <div className="IssueHeaderOrder">
                        <div className="IssueHeaderOrderName">订货单</div>
                        <div className="IssueHeaderOrderId">
                            <div className="IssueHeaderOrderIdTitle">No</div>
                            <div className="IssueHeaderOrderIdTitleId">{orderId}</div>
                        </div>
                    </div>
                </div>
                <div className="IssueDate">
                    <div className="IssueOrderDate">
                        <span>开单日期：</span>
                        <Input style={{width: 60}}  onChange={(e) => debounce(this.getCurrentYear(e), 500)}/>
                        <span style={{marginLeft: 2}}>年</span>
                        <Input style={{width: 40}} onChange={(e) => debounce(this.getCurrentMonth(e), 500)} />
                        <span style={{marginLeft: 2}}>月</span>
                        <Input style={{width: 40}} onChange={(e) => debounce(this.getCurrentDate(e), 500)}  />
                        <span style={{marginLeft: 2}}>日</span>
                    </div>
                    <div className="IssueOrderPerson">
                        <span>开单人：</span>
                        <Input style={{width: 100, marginRight: 10}} onChange={(e) => debounce(this.getCurrentName(e), 500)} />
                    </div>
                </div>
                <div className="IssueContent">
                    <div className="clientInfo">
                        <div className="clientName">
                            <span>客户名称：</span>
                            <Input style={{width: 80}} onChange={(e) => debounce(this.getCurrentClientName(e), 500)} />
                        </div>
                        <div className="clientAdds">
                            <span>客户地址：</span>
                            <Input style={{width: 200}} onChange={(e) => debounce(this.getCurrentClientAdds(e), 500)} />
                        </div>
                        <div className="clientPhone" style={{marginRight: '10px'}}>
                            <span>客户电话：</span>
                            <Input style={{width: 120}} onChange={(e) => debounce(this.getCurrentClientPhone(e), 500)} />
                        </div>
                    </div>
                    <Table columns={columns} dataSource={submitData.dataSource} bordered/>
                </div>
                <div className="IssueBottom">
                    <div className="IssueBottomPrice">
                        <span>实际金额：</span>
                        <span>{submitData.price}</span>
                    </div>
                    <div className="IssueBottomOrderPrice">
                        <span>定金：</span>
                        <Input style={{width: '60px'}} onChange={(e) => debounce(this.getCurrentOrderPrice(e))} />
                    </div>
                    <div className="IssueBottomOrderPrice">
                        <span>下欠金额：</span>
                        <span>{submitData.resultPrice}</span>
                    </div>
                    <div className="IssueBottomContact">
                        <span>联系电话：</span>
                        <Input style={{width: '110px'}} onChange={(e) => debounce(this.getCurrentPhone(e))} />
                    </div>
                    <div className="IssueBottomSign">
                        <span style={{marginRight: 100}}>客户签名：</span>
                    </div>
                </div>
                <div className="action">
                    <Button type="primary" onClick={() => this.setState({visible: true})}>增加</Button>
                    <Button type="primary" onClick={this.submitDataToServer}>打印</Button>
                </div>
                <Drawer
                    title="添加商品"
                    placement="right"
                    closable={false}
                    width={400}
                    onClose={() => this.setState({visible: false})}
                    visible={visible}
                    destroyOnClose
                >
                    <Form
                        {...layout}
                        name="basic"
                        onFinish={this.addForm}
                    >
                        <Form.Item
                            label="品名型号规格"
                            name="name"
                            rules={[{ required: true, message: '请输入你的品名型号规格' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="颜色"
                            name="color"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="单位"
                            name="unit"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="数量"
                            name="number"
                            rules={[{ required: true, message: '请输入产品数量' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="价格"
                            name="price"
                            rules={[{ required: true, message: '请输入产品价格' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="备注"
                            name="extra"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item 
                            {...tailLayout} 
                        >
                            <Button type="primary" htmlType="submit">
                                添加
                            </Button>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        )
    }
}

export default Issue;