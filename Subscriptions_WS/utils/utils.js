const axios = require('axios')

let getData = async function(url){
    return axios.get(url)
}

let addDocument = async function(url, documentObj){
    let resp = await axios.post(url, documentObj);
    return resp.data
}

module.exports =  {getData, addDocument}