import { post } from '../utils/request';


const baseUrl = 'http://localhost:3001';


//获取商品列表接口
export const getDisplayList = (params) => post(baseUrl, '/display/list', params);

//增加商品列表接口
export const addDisplayList = (params) => post(baseUrl, '/display/add', params);

//编辑商品列表接口
export const editDisplayList = (params) => post(baseUrl, '/display/edit', params);

//删除商品列表接口
export const deleteDisplay = (params) => post(baseUrl, '/display/delete', params);

//获取轮播列表接口
export const getImgUrl = (params) => post(baseUrl, '/display/get/img', params);

//编辑轮播列表接口
export const editImgUrl = (params) => post(baseUrl, '/display/edit/img', params);



