const axios = require('axios')

let getAll = (url) => {
    return axios.get(url)
}

let getById = async(url, id) => {
    let data = await axios.get(url+id)
    return data.data;
}

let add = async(url, obj) => {
    let resp = await axios.post(url, obj)
    return resp.data
}

let update = async(url, id, obj) => {
    let resp = await axios.put(url+id, obj)
    return resp.data
}

let del = async(url, id) =>{
    let resp = await axios.delete(url+id)
    return resp.data
}

module.exports = {getAll, getById, add, update, del}