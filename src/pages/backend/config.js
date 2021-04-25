import React, { Fragment } from 'react';
import { Menu } from 'antd';
const { SubMenu } = Menu;

export const sideConfig = [
    {
        key: '0',
        title: '出单'
    },
    {
        key: '1',
        title: '定制家具'
    },
    {
        key: '2order',
        title: '订单管理',
        child: [
            {
                key: '2order,0',
                title: '未完成'
            },
            {
                key: '2order,1',
                title: '已完成'
            }
        ]
    },
    {
        key: '3',
        title: '商品展示',
    },
    {
        key: '4',
        title: '图片轮播',
    },
    // {
    //     key: '5data',
    //     title: '数据详情',
    //     child:[
    //         {
    //             key: '5data,0',
    //             title: '利润计算'
    //         },
    //         {
    //             key: '5data,1',
    //             title: '推荐进货'
    //         }
    //     ]
    // },
    {
        key: '6',
        title: '文件上传'
    }
]


export default function renderSideContent(config = sideConfig) {
    return(
        <Fragment>
            {
                config.map(item => (
                    item.child ? (
                        <SubMenu key={item.key} title={item.title}>
                            {renderSideContent(item.child)}
                        </SubMenu>
                    ) : <Menu.Item key={item.key}> {item.title} </Menu.Item>
                ))
            }
        </Fragment>
    )
}
