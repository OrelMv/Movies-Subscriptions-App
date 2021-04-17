const express = require('express')
const membersBL = require('../models/BLs/membersBL')

const router = express.Router();

router.route('/').get(async function(req, resp){
    let data = await membersBL.getAllMembers();
    return resp.json(data)
})

router.route('/:memberId').get(async function(req, resp){
    let memberId = req.params.memberId;
    let data = await membersBL.getMemberById(memberId)
    return resp.json(data)
})

router.route('/').post(async function(req, resp){
    let memberObj = req.body;
    let data = await membersBL.addMember(memberObj)
    return resp.json(data)
})

router.route('/:memberId').put(async function(req,resp){
    let memberId = req.params.memberId
    let memberObj = req.body
    let data = await membersBL.updateMember(memberId, memberObj)
    return resp.json(data)
})

router.route('/:memberId').delete(async function(req, resp){
    let memberId = req.params.memberId
    let data = await membersBL.deleteMember(memberId)
    return resp.json(data)
})

module.exports = router