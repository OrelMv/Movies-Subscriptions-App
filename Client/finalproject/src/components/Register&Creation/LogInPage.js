import React, {useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import utils from '../../Rest_API_utils/utils'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LockOpenTwoToneIcon from '@material-ui/icons/LockOpenTwoTone';

function LogInPage(props) {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const [validPassword, setValidPassword] = useState(false)

    const [users, setUsers] = useState([])


    useEffect(() => {
        let getAllUsers = async() => {
            let users = await utils.getAllData("http://localhost:8001/api/users")
            setUsers(users.data)
        }

        getAllUsers()
    }, [])



    //check if the user Name and password are in the usersDB
    let checkUserValidation = async function(){

        let allUsersLogInInfo = users.logInInfo //array
        let userIsValid = false;
        let id = "";
        for(let i = 0; i < allUsersLogInInfo.length; i++){
            if(allUsersLogInInfo[i].userName == userName && allUsersLogInInfo[i].password == password){
                    id = allUsersLogInInfo[i]._id
                    userIsValid = true
                    break;  
            }
        }
        if(userIsValid && validPassword){
            localStorage.setItem('userId', id)
            props.history.push(`/mainPage`)    
        }
        else{
            alert("One of the fields in not valid")
        }
    }

    let getPassword = function(e){
        setPassword(e.target.value)
        setValidPassword(e.target.value == ""? false:true)
    }


    return (
        <div>
            <h2>Log In Page</h2>

            <TextField label="User Name" variant="outlined"
                onChange={e=> setUserName(e.target.value)}/>
                
            <br /><br />

            <TextField label="Password" type="password" variant="outlined"
                onChange={getPassword} />
                
            <br /><br />

            <Button variant="contained" color="primary" onClick={checkUserValidation}
            endIcon={<LockOpenTwoToneIcon />}>
                Log In
            </Button>
            
            <br /><br />

            New User? : <Link to="/createAccount">Create Account</Link>
        </div>
    )
}

export default LogInPage
