const express = require('express')
const utils = require('../../utils')

const router = express.Router()

router.route('/').get(async(req, resp) => {
    let allMembersData = await utils.getAll("http://localhost:8000/api/members")
    return resp.json(allMembersData.data)
})

router.route('/:memberId').get(async(req, resp) => {
    let memberId = req.params.memberId
    let memberData = await utils.getById("http://localhost:8000/api/members/", memberId)
    return resp.json(memberData)
})

router.route('/').post(async(req, resp) => {
    let obj = req.body
    let data = await utils.add("http://localhost:8000/api/members", obj)
    return resp.json(data)
})

router.route('/:memberId').put(async(req, resp) => {
    let memberId = req.params.memberId
    let obj = req.body
    let data = await utils.update("http://localhost:8000/api/members/", memberId, obj)
    return resp.json(data)
})

router.route('/:memberId').delete(async(req, resp) => {
    let memberId = req.params.memberId
    let data = await utils.del("http://localhost:8000/api/members/", memberId)
    return resp.json(data)
})

module.exports = router