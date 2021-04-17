const express = require('express')
const usersBL = require('../models/BLs/usersDataBaseBL')
const usersJsonBL = require('../models/BLs/usersJsonBL')
const usersPermissionsBL = require('../models/BLs/usersPermissionsJsonBL')

const router = express.Router();


router.route('/').get(async function(req, resp){
    let logInInfo = await usersBL.getLogInInfo();
    let usersJsonData = await usersJsonBL.getUsersData();
    let permissionsJsonData = await usersPermissionsBL.getAllUsersPermissions()
    return resp.json({
        logInInfo: logInInfo,
        usersJsonData: usersJsonData,
        usersPermissionsData: permissionsJsonData
    })
})

router.route('/:userId').get(async function(req, resp){
    let userId = req.params.userId;
    
    let currentUserLogInInfo = await usersBL.getUserById(userId)
    let currentUserJsonData = await usersJsonBL.getUserById(userId)
    let currentUserPermissions = await usersPermissionsBL.getUserPermissions(userId)
    return resp.json({
        logInInfo: currentUserLogInInfo,
        usersJsonData: currentUserJsonData,
        usersPermissionsData: currentUserPermissions
    })
})

router.route('/').post(async function(req, resp){
    let userObj = req.body;

    let dataBaseResp = await usersBL.addUser(userObj)
    let usersJsonDataResp = await usersJsonBL.addUser(dataBaseResp.userId, userObj)
    let permissionsResp = await usersPermissionsBL.addUserPer(dataBaseResp.userId, userObj)

    return resp.json({
        dbResp: dataBaseResp.resp,
        usersJsonResp: usersJsonDataResp,
        permissionsResp: permissionsResp
    })
})


router.route('/:userId').put(async function(req,resp){
    let userId = req.params.userId
    let userObj = req.body

    let dataBaseResp = await usersBL.updateUser(userId, userObj)
    let usersJsonDataResp = await usersJsonBL.updateUser(userId, userObj)
    let permissionsResp = await usersPermissionsBL.updatePermissions(userId, userObj.permissions)
    
    return resp.json({
        dbResp: dataBaseResp,
        usersJsonResp: usersJsonDataResp,
        permissionsResp: permissionsResp
    })
})

router.route('/:userId').delete(async function(req, resp){
    let userId = req.params.userId

    let dataBaseResp = await usersBL.deleteUser(userId)
    let usersJsonDataResp = await usersJsonBL.deleteUser(userId)
    let permissionsResp = await usersPermissionsBL.deleteAllUsersPermissions(userId)
    return resp.json({
        dbResp: dataBaseResp,
        usersJsonResp: usersJsonDataResp,
        permissionsResp: permissionsResp
    })
})

module.exports = router