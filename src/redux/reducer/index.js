import { type } from '../action'

const initState = {
    isLogin: false,
    username: '',
    status: 0,
    detail: '',
}

export default(state = initState, action) => {
    switch(action.type) {
        case type.IS_LOGIN: 
        return {
            ...state,
            isLogin: action.isLogin
        }
        case type.SET_USERNAME:
            return {
                ...state,
                username: action.username
            }
        case type.SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        case type.ORDER_DETAIL:
            return {
                ...state,
                detail: action.detail
            }
        default: 
            return {
                ...state
            }
    }
}