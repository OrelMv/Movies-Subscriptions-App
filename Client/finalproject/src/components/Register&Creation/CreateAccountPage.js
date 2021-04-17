import React,{useState, useEffect} from 'react'
import utils from '../../Rest_API_utils/utils';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';

//sys admin had to put his detalis in the data base before the user can register to the website
function CreateAccountPage(props) {

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



    let checkUserInDB = async function(){
        let userExist = users.logInInfo.filter(userInfo => userInfo.userName == userName)
        //checking if the userName exists
        if(userExist.length != 0){

            //checking if the password field is not empty
            if(validPassword){
                let userData = await utils.getDataById(userExist[0]._id, "http://localhost:8001/api/users/")
                let obj = {...userData.logInInfo, ...userData.usersJsonData, ...userData.usersPermissionsData, password: password}
                await utils.updateData(userExist[0]._id, obj, "http://localhost:8001/api/users/")
                alert("User created successfuly")
                props.history.push('/');
            }
            
            else{
                alert("Password is mandatory")
            }
            
        }
        else{
            alert("User Name doesnt exist - admin has to register you to the system")
            props.history.push('/')

        }
        
    }

    return (
        <div>
            <h2>Create an account</h2>

            <TextField label="User Name" variant="outlined"
                onChange={e=> setUserName(e.target.value)}/>
                
            <br /><br />


            <TextField label="Password" variant="outlined"
                onChange={e=>{
                    setPassword(e.target.value)
                    setValidPassword(e.target.value == ""? false: true)
                }} />
                
            <br /><br />

            <Button variant="contained" color="primary" onClick={checkUserInDB}
            endIcon={<PersonAddTwoToneIcon />}>
                Create
            </Button>
        </div>
    )
}

export default CreateAccountPage
