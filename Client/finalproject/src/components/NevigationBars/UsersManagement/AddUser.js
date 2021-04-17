import React, {useState, useEffect, useContext} from 'react'
import utils from '../../../Rest_API_utils/utils'
import {UsersContext} from '../../Contexts/UserContext'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

function AddUser(props) {

    const [permissionsList, setList] = useState([])
    const [fName, setfName] = useState('')
    const [lName, setlName] = useState('')
    const [userName, setUserName] = useState('')
    const [sTimeOut, setSessionTimeOut] = useState(0)
    const [createdDate, setDate] = useState('')

    const [viewSubsStatus, setViewSubs] = useState(false)
    const [allSubsStatus, setAllSubsStatus] = useState({create: false, update: false, delete: false})

    const [viewMoviesStatus, setViewMovies] = useState(false)
    const [allMoviesStatus, setAllMoviesStatus] = useState({create: false, update: false, delete: false})

    const setAllUsers = useContext(UsersContext)[3]


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

    let saveUser = async function(e){
        
        e.preventDefault();
        let obj = {
            userName: userName,
            password: "",
            firstName: fName,
            lastName: lName,
            sessionTimeOut: parseInt(sTimeOut),
            createdDate: createdDate,
            permissions: permissionsList
        }


        await utils.addData("http://localhost:8001/api/users", obj)

        let resp = await utils.getAllData("http://localhost:8001/api/users")

        setAllUsers(resp.data)

        alert("User Added Successfuly")
        nevToUsersManagement();
    }



    return (
        <div>
            <h2>Add New User</h2>


            <form onSubmit={saveUser}>

                <TextField onChange={e => setfName(e.target.value)}
                    label="First Name" variant="outlined" size="small"/>
                <br /> <br /> 

                <TextField onChange={e => setlName(e.target.value)}
                    label="Last Name" variant="outlined" size="small"/>
                <br /> <br /> 

                <TextField onChange={e => setUserName(e.target.value)}
                    label="User Name" variant="outlined" size="small"/>
                <br />  <br /> 

                <TextField onChange={e => setSessionTimeOut(e.target.value)}
                    label="Session time out (Minutes)" variant="outlined" size="small"/>
                <br /> <br /> 

                <TextField onChange={e => setDate(e.target.value)}
                    label="Created Date:(YYYY-MM-DD)" variant="outlined" size="small"/>
                <br /> <br /> 


                Permissions: <br /> 
                <input type="checkbox" value="View Subscriptions" onChange={changeViewSubsFieldStatus}  checked={viewSubsStatus} /> View Subscriptions 
                <br />
                <input type="checkbox" value="Create Subscriptions" onChange={addSubcriptionPermission}  /> Create Subscriptions
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
                <input type="checkbox" value="Update Movies" onChange={addMoviePermission} /> Update Movies

                <br /> <br />

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    type="submit"
                    >
                    Save
                </Button> 

                <Button 
                    variant="contained"
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

export default AddUser
