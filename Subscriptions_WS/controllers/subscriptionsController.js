const express = require('express')
const subscriptionsBL = require('../models/BLs/subscriptionsBL')

const router = express.Router();

router.route('/').get(async function(req, resp){
    let data = await subscriptionsBL.getAllSubs()
    return resp.json(data)
})

router.route('/:subId').get(async function(req, resp){
    let subId = req.params.subId;
    let data = await subscriptionsBL.getSubById(subId)
    return resp.json(data)
})

router.route('/').post(async function(req, resp){
    let subObj = req.body;
    let data = await subscriptionsBL.addSub(subObj)
    return resp.json(data)
})

router.route('/:subId').put(async function(req,resp){
    let subId = req.params.subId
    let subObj = req.body
    let data = await subscriptionsBL.updateSub(subId, subObj)
    return resp.json(data)
})

router.route('/:subId').delete(async function(req, resp){
    let subId = req.params.subId
    let data = await subscriptionsBL.deleteSub(subId)
    return resp.json(data)
})

module.exports = router