// import jwt_decode from 'jwt-decode';
export const user_token = localStorage.getItem('user_token')

var jwt_decode = require('jwt-decode');

const decode_token = (user_token_decoded_func) => {
    let decoded
    if (user_token_decoded_func) {
        decoded = jwt_decode(user_token_decoded_func);
    } else {
        decoded = { id: null, type: null }
    }
    return decoded;

}

export const user_token_decoded = decode_token(user_token)
// console.log('tk',user_token)