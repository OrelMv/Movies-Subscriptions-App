import React, {useEffect, useContext} from 'react'
import {Switch, Route} from 'react-router-dom'

import AllUsers from './AllUsers'
import AddUser from './AddUser'
import utils from '../../../Rest_API_utils/utils'

import {UsersContext} from '../../Contexts/UserContext'

import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

function MainUsersComp(props) {

    const [userData, setUserData, allUsersData, setAllUsersData] = useContext(UsersContext)

    useEffect(() => {
        let getAllUsers = async function(){
            let resp = await utils.getAllData("http://localhost:8001/api/users")
            setAllUsersData(resp.data)
        }
        getAllUsers()
    }, [])

    return (
        <div>
            
            <Button variant="contained" color="secondary" 
                onClick={()=> props.history.push('/mainPage/usersManagement')}>
                All Users
            </Button>

            <Button variant="contained" color="secondary" style={{marginLeft:"8px"}} 
                onClick={()=> props.history.push('/mainPage/usersManagement/addUser')}
                endIcon={<PersonAddIcon />}>
                Add User
            </Button>

            <Switch>

                <Route path="/mainPage/usersManagement/addUser" component={AddUser}></Route>

                <Route path="/mainPage/usersManagement" component={AllUsers}></Route>

            </Switch>

        </div>
    )
}

export default MainUsersComp
