const express = require('express')
const utils = require('../../utils')

const router = express.Router()

router.route('/').get(async(req, resp) => {
    let allSubsData = await utils.getAll("http://localhost:8000/api/subscriptions")
    return resp.json(allSubsData.data)
})

router.route('/:subId').get(async(req, resp) => {
    let subId = req.params.subId
    let subData = await utils.getById("http://localhost:8000/api/subscriptions/", subId)
    return resp.json(subData)
})

router.route('/').post(async(req, resp) => {
    let obj = req.body
    let data = await utils.add("http://localhost:8000/api/subscriptions", obj)
    return resp.json(data)
})

router.route('/:subId').put(async(req, resp) => {
    let subId = req.params.subId
    let obj = req.body
    let data = await utils.update("http://localhost:8000/api/subscriptions/", subId, obj)
    return resp.json(data)
})

router.route('/:subId').delete(async(req, resp) => {
    let subId = req.params.subId
    let data = await utils.del("http://localhost:8000/api/subscriptions/", subId)
    return resp.json(data)
})

module.exports = router