import React,{useEffect, useContext, useState} from 'react'
import utils from '../../../Rest_API_utils/utils'
import {UsersContext} from '../../Contexts/UserContext'

import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';

function EditUser(props) {

   
    const [permissionsItems, setPermissionsItems] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [sessionTimeOut, setSession] = useState(0)

    const [permissionsList, setList] = useState([])
    const [viewSubsStatus, setViewSubs] = useState(false)
    const [allSubsStatus, setAllSubsStatus] = useState({create: false, update: false, delete: false})

    const [viewMoviesStatus, setViewMovies] = useState(false)
    const [allMoviesStatus, setAllMoviesStatus] = useState({create: false, update: false, delete: false})

    const userDataForEdit = useContext(UsersContext)[4]


    useEffect(() => {

        setFirstName(userDataForEdit.firstName)
        setLastName(userDataForEdit.lastName)
        setUserName(userDataForEdit.userName)
        setSession(userDataForEdit.sessionTimeOut)

        let counter = 0;
        if(userDataForEdit.permissions != null){
            let permissionsItems = userDataForEdit.permissions.map((per, index) => {
                counter++
                return <span style={{color:"blue"}} key={index}>{per} {userDataForEdit.permissions.length == counter? "." : ","}</span>
            })
    
            setPermissionsItems(permissionsItems)
        }
       

    }, [userDataForEdit])


    useEffect(() => {
        console.log(permissionsList);
        
    }, [permissionsList])



    let addSubcriptionPermission = (e) => {
        let perList = [...permissionsList]  
        if(e.target.checked){
            //monitoring the checked values of the permissions (create/update/delete subs) and according to this we can checked/unchecked 
            //the view subcriptions field --> because we cannot uncheck the view subscriptions if one of these (create/update/delete subs) are checked
            changeSubStatus(e.target.value, true)
            setViewSubs(true)

            //adding the permission to the the list 
            perList.push(e.target.value)
            
            //adding view subscriptions to the list --> but only if its not already there
            let viewSubscriptionExists = false
            perList.forEach(per => {
                if(per == "View Subscriptions"){
                    viewSubscriptionExists = true
                }
            })
            //if view subs not in the list --> push
            if(!viewSubscriptionExists){
                perList.push("View Subscriptions")
            }
            
            setList(perList)

        }
        else{
            changeSubStatus(e.target.value, false)
            
            //removing the permissions that the user unchecked
            let filteredPerList = perList.filter(per => per != e.target.value)
            setList(filteredPerList)

        }
    
    }


    let changeSubStatus = (value, condition) => {
        let subsPer = {...allSubsStatus}
        switch (value) {
            case "Create Subscriptions":
                setAllSubsStatus({...subsPer, create : condition })
                break;
            case "Update Subscriptions":
                setAllSubsStatus({...subsPer, update : condition })
                break;
            case "Delete Subscriptions":
                setAllSubsStatus({...subsPer, delete : condition })
                break;
            default:
                break;
        }
    }


    let changeViewSubsFieldStatus = (e) => {
        let perList = [...permissionsList]
        if(e.target.checked){
            setViewSubs(true)
            perList.push("View Subscriptions")
            setList(perList)
        }
        else{
            if(!allSubsStatus.create && !allSubsStatus.update && !allSubsStatus.delete){
                for(let i = 0; i < perList.length; i++){
                    if(perList[i] == "View Subscriptions"){
                        perList.splice(i, 1)
                        setList(perList)
                    }
                }
                setViewSubs(false)
            }
            
        }
    }


    let changeMovieStatus = (value, condition) => {
        let moviesPer = {...allMoviesStatus}
        switch(value){
            case "Create Movies":
                setAllMoviesStatus({...moviesPer, create: condition})
                break;
            case "Update Movies":
                setAllMoviesStatus({...moviesPer, update : condition })
                break;
            case "Delete Movies":
                setAllMoviesStatus({...moviesPer, delete : condition })
                break;
            default:
                break;
        }
    }



    let addMoviePermission = (e) => {
        let perList = [...permissionsList]
        if(e.target.checked){
            changeMovieStatus(e.target.value, true)
            setViewMovies(true)
            perList.push(e.target.value)

            let viewMoviesExists = false
            perList.forEach(per => {
                if(per == "View Movies"){
                    viewMoviesExists = true
                }
            })
            //if view subs not in the list --> push
            if(!viewMoviesExists){
                perList.push("View Movies")
            }
            
            setList(perList)
        }
        else{
            changeMovieStatus(e.target.value, false)
            
            //removing the permissions that the user unchecked
            let filteredPerList = perList.filter(per => per != e.target.value)
            setList(filteredPerList)
        }
    } 



    let changeViewMoviesFieldStatus = (e) => {
        let perList = [...permissionsList]
        if(e.target.checked){
            setViewMovies(true)
            perList.push("View Movies")
            setList(perList)
        }
        else{
            if(!allMoviesStatus.create && !allMoviesStatus.update && !allMoviesStatus.delete){
                for(let i = 0; i < perList.length; i++){
                    if(perList[i] == "View Movies"){
                        perList.splice(i, 1)
                        setList(perList)
                    }
                }
                setViewMovies(false)
            }
            
        }
    }




    let nevToUsersManagement = function(){
        props.history.push('/mainPage/usersManagement')
    }


    let updateUser = async function(e){
        e.preventDefault()
        let userObj = {
            firstName: firstName,
            lastName: lastName,
            password: userDataForEdit.password,
            userName: userName,
            sessionTimeOut: sessionTimeOut,
            createdDate: userDataForEdit.createdDate,
            permissions: permissionsList
        }

        await utils.updateData(userDataForEdit._id, userObj, "http://localhost:8001/api/users/")

        alert(`${userName} has been updated`)
        nevToUsersManagement()
    }


    return (
        <div>
            <h1>Edit User: {userDataForEdit.firstName} {userDataForEdit.lastName}</h1>

            <form onSubmit={updateUser}>

                <TextField label="First Name" value={firstName} variant="filled"
                    onChange={e=> setFirstName(e.target.value)}/> 
                <br /> <br />

                <TextField label="Last Name" value={lastName} variant="filled"
                    onChange={e=> setLastName(e.target.value)}/> 
                <br /> <br />

                <TextField label="User Name" value={userName} variant="filled"
                    onChange={e=> setUserName(e.target.value)}/> 
                <br /> <br />

                <TextField label="Session time out (Minutes)" value={sessionTimeOut} variant="filled"
                    onChange={e=> setSession(e.target.value)}/> 
                <br /> <br />

                <TextField
                    label="Created Date(YYYY-MM-DD)"
                    defaultValue={userDataForEdit.createdDate}
                    InputProps={{
                        readOnly: true,
                    }}
                    variant="filled"/>

                <br />

                Permissions: <br /> <b>Current Permissions: {permissionsItems}</b>  <br />
                <input type="checkbox" value="View Subscriptions" onChange={changeViewSubsFieldStatus} checked={viewSubsStatus} /> View Subscriptions 
                <br />
                <input type="checkbox" value="Create Subscriptions" onChange={addSubcriptionPermission} /> Create Subscriptions
                <br />
                <input type="checkbox" value="Delete Subscriptions" onChange={addSubcriptionPermission} /> Delete Subscriptions
                <br />
                <input type="checkbox" value="Update Subscriptions" onChange={addSubcriptionPermission} /> Update Subscriptions
                <br />
                <input type="checkbox" value="View Movies" onChange={changeViewMoviesFieldStatus} checked={viewMoviesStatus} /> View Movies
                <br />
                <input type="checkbox" value="Create Movies" onChange={addMoviePermission} /> Create Movies
                <br />
                <input type="checkbox" value="Delete Movies" onChange={addMoviePermission} /> Delete Movies
                <br />
                <input type="checkbox" value="Update Movies" onChange={addMoviePermission}/> Update Movies

                <br /> <br />

                <Button
                    variant="contained"
                    size="small"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                    type="submit"
                    >
                    Update
                </Button>

                <Button 
                    variant="contained"
                    size="small"
                    onClick={nevToUsersManagement}
                    style={{marginLeft: "8px"}}
                    startIcon={<CancelIcon />}
                    >
                    Cancel
                </Button>

                <br /> <br />


            </form>
        </div>
    )
}

export default EditUser
