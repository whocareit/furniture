import { post } from '../utils/request';


const baseUrl = 'http://localhost:3001';

//登陆接口处理
export const userLogin = params => post(baseUrl, "/users/login", params)

//注册接口处理
export const userRegister = params => post(baseUrl, "/users/register", params)