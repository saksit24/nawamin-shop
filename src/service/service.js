// export const ip = "http://192.168.1.38:3003/api/v1/"  //wifi สำนักงาน
//export const ip = "http://192.168.43.57:3003/api/v1/"
export const ip = "http://127.0.0.1:3003/api/v1/"
//export const ip = "http://142.4.201.250:3003/api/v1/"
// export const ip = "http://192.168.137.1:3003/api/v1/" //wifi คอมกาย
// export const ip = "http://172.16.136.46:3003/api/v1/" //ais wifi


export const get = (path, token) => new Promise((resolve, reject) => {
    fetch(ip + path, {
        method: 'GET',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(res => {
        setTimeout(() => null, 0);
        return res.json()
    }).then(json => {
        resolve(json);
    }).catch((err) => reject(err))
})

export const post = (object, path, token) => new Promise((resolve, reject) => {
    fetch(ip + path, {
        method: 'POST',
        headers: {
            'Authorization': token,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    }).then(res => {
        setTimeout(() => null, 0);
        return res.json()
    }).then(json => {
        resolve(json);
    }).catch((err) => reject(err))
})

// get_order = async () => {
//     let url = this.props.location.search;
//     let params = queryString.parse(url);
//     try {
//         await post(params, 'trader/get_order_info', user_token).then((result) => {
//             if (result.success) {
//                 this.setState({
//                     order: result.result,
//                     detail: result.result.detail,
//                     plant: result.result.plant,
//                 })
//                 setTimeout(() => {
//                     console.log("get_product1", result.result)
//                 }, 500)
//             } else {
//                 window.location.href = "/manage_order";
//                 alert(result.error_message)
//             }
//         });
//     } catch (error) {
//         alert("get_cart_trader" + error);
//     }
// }