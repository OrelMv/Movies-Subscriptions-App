import React from 'react'
import {Route, Switch} from 'react-router-dom'

import MainUsersComp from './MainUsersComp'
import EditUser from './EditUser'



function UsersManagement() {


    return (
        <div>
            <h1>Users </h1>

                <Switch>
    
                    <Route path="/mainPage/usersManagement/editUser" component={EditUser}></Route>
                    
                    <Route path="/mainPage/usersManagement" component={MainUsersComp}></Route>

                </Switch>


        </div>
    )
}

export default UsersManagement
