import { post } from '../utils/request';


const baseUrl = 'http://localhost:3001';


//获取前台轮播图片
export const getCarousel = (params) => post(baseUrl, '/display/get/carousel', params); 

//获取当季新品图片
export const getCurImg = (params) => post(baseUrl, '/display/get/cur', params);

//获取当季新品图片
export const getSaleImg = (params) => post(baseUrl, '/display/get/sale', params);

//获取bed的list
export const getBedImg = (params) => post(baseUrl, '/display/get/bed', params);

//获取sofa的list
export const getSofaImg = (params) => post(baseUrl, '/display/get/sofa', params);

//获取table的list
export const getTableImg = (params) => post(baseUrl, '/display/get/table', params);

//获取wardrobe的list
export const getWardrobeImg = (params) => post(baseUrl, '/display/get/wardrobe', params);

//获取order furniture的list
export const getOrderFurniture = (params) => post(baseUrl, '/display/get/order/furniture', params);