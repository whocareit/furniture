import { get, post } from '../utils/request';


const baseUrl = 'http://localhost:3001';

//提交出单信息
export const orderSubmit = params => post(baseUrl, "/order/output", params);

//获取当前已经订单
export const getComplete = (params) => post(baseUrl, "/order/complete", params);

//获取当前未订单
export const getIncomplete = (params) => post(baseUrl, "/order/incomplete", params);

//更改订单状态
export const changeStatue = (params) => post(baseUrl, "/order/change", params);

//删除订单
export const deleteOrder = (params) => post(baseUrl, "/order/delete", params);

//获取订单详情内容接口
export const getOrderDetail = (params) => post(baseUrl, '/order/detail', params);

//获取定制家具列表接口
export const getOrderFurniture = (params) => post(baseUrl, '/order/furniture/list', params);

//增加定制家具接口
export const addOrderFurniture = (params) => post(baseUrl, '/order/furniture/add', params);

//编辑定制家具接口
export const editOrderFurniture = (params) => post(baseUrl, '/order/furniture/edit', params);

//删除定制家具接口
export const deleteOrderFurniture = (params) => post(baseUrl, '/order/furniture/delete', params);

