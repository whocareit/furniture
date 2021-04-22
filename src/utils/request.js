import axios from 'axios';


export const get = (baseUrl, url, params={}) => {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl + url, { params: params})
        .then((res, err) => {
            if(res) {
                return resolve(res.data);
            }

            return reject(err);
        })
        .catch(err => reject(err));
    })
}   


export const post = (baseUrl, url, params) => {
    return new Promise((resolve, reject) => {
        axios.post(baseUrl + url, params)
        .then((res, err) => {
            if(res) {
                return resolve(res.data);
            }

            return reject(err);
        })
        .catch(err => reject(err));
    })
}