import axios from 'axios'

let getAllData = function(url){
    return axios.get(url)
}

let getDataById = async function(id, url){
    let userData = await axios.get(url+id)
    return userData.data
}

let updateData = async function(id, obj, url){
    let resp = await axios.put(url+id, obj);
    return resp.data
}

let addData = async function(url, obj){
    let resp = await axios.post(url, obj)
    return resp.data
}

let deleteData = async function(id, url){
    let resp = await axios.delete(url+id)
    return resp.data
}


export default {getAllData, getDataById, updateData, addData, deleteData}