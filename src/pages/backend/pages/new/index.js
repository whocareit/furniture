import React , {  Fragment, useState, useEffect } from 'react';
import { 
    Table,
     Space, 
     Button,
     Drawer,
     Form,
     Input,
     notification
} from 'antd';
import { getImgUrl, editImgUrl } from '../../../../api/display';

export default function() {

    const [dataSource, setDataSource] = useState([])
    const [visible, setVisible] = useState(false)
    const [initialValues, setInitialValues] = useState({})

    const layout = {
        labelCol: { span: 8 },
        wrapperCol: { span: 16 },
    };
    
    const tailLayout = {
        wrapperCol: { offset: 20, span: 4 },
    };

    useEffect(() => {
        //获取初始化数据
        getInitData()
    },[visible])

    function getInitData() {
        getImgUrl().then(res => {
            if(res.errno === 0) {
                const { data } = res;
                const arr = [];
                data.result.forEach(item => {
                    const { name_id,  ...rest } = item
                    const newItem = {
                        ...rest,
                        key: name_id
                    }
                    arr.push(newItem);
                })
                console.log(arr)
                setDataSource(arr)
            }
        
        })
    }

    function handleEditOrder (record) {
        setVisible(true);
        setInitialValues(record);
    }

    function submitForm(value) {
        const { key } = initialValues;
        editImgUrl({...value, key}).then(res => {
            const { errno, data } = res;
            if(errno === 0) {
                getInitData();
                notification.success({
                    message: data.info
                })
            } else {
                notification.error({
                    message: data.info
                })
            }
            setVisible(false);
            setInitialValues({});
        })
    }

    const columns = [
        {
            title: '轮播名称',
            dataIndex: 'name',
            key: 'name',
            width: 300,
        },
        {
            title: '轮播图1',
            dataIndex: 'img_url1',
            key: 'img_url1',
            width: 300,
            render: (value) => (
                <div style={{width: '100%', overflow: 'hidden'}}>{value}</div>
            )
        },
        {
            title: '轮播图2',
            dataIndex: 'img_url2',
            key: 'img_url2',
            width: 300,
            render: (value) => (
                <div style={{width: '100%', overflow: 'hidden'}}>{value}</div>
            )
        },
        {
            title: '轮播图3',
            dataIndex: 'img_url3',
            key: 'img_url2',
            width: 300,
            render: (value) => (
                <div style={{width: '100%', overflow: 'hidden'}}>{value}</div>
            )
        },
        {
            title: '操作',
            key: 'action',
            render: (record) => (
                <Space>
                    <Button type="primary" onClick={() => handleEditOrder(record)}>编辑</Button>
                </Space>
            )
        }
    ]
    
    return(
        <Fragment>
            <Table 
                columns = {columns}
                dataSource={dataSource}
            />
            <Drawer
                    title={"编辑图片"}
                    placement="right"
                    closable={false}
                    width={400}
                    onClose={() => setVisible(false)}
                    visible={visible}
                    destroyOnClose
                >
                    <Form
                        {...layout}
                        name="basic"
                        onFinish={submitForm}
                        initialValues={initialValues}
                        
                    >
                        <Form.Item
                            label="轮播名称"
                            name="name"
                            rules={[{ required: true, message: '轮播名称' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="轮播图1"
                            name="img_url1"
                            rules={[{ required: true, message: '轮播图1' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="轮播图2"
                            name="img_url2"
                            rules={[{ required: true, message: '轮播图2' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="轮播图3"
                            name="img_url3"
                            rules={[{ required: true, message: '轮播图3' }]}
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
        </Fragment>
    )
}