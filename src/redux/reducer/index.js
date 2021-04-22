import { type } from '../action'

const initState = {
    isLogin: false,
    username: '',
    status: 0,
}

export default(state = initState, action) => {
    switch(action.type) {
        case type.IS_LOGIN: 
        return {
            ...state,
            isLogin: action.isLogin
        }
        break;
        case type.SET_USERNAME:
            return {
                ...state,
                username: action.username
            }
        break;
        case type.SET_STATUS:
            return {
                ...state,
                status: action.status
            }
        break;
        default: 
            return {
                ...state
            }
        break
    }
}