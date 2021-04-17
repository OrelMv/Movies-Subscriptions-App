import React from 'react'
import {Switch, Route} from 'react-router-dom'
import LogInPage from './Register&Creation/LogInPage'
import CreateAccountPage from './Register&Creation/CreateAccountPage'
import MainPage from './MainPage'





function PlaceHolder() {
    return (
        <div>
            <h1>Movies - Subscriptions Web Site</h1>

                <Switch>

                    <Route path="/" exact component={LogInPage}></Route>
                    <Route path="/createAccount" component={CreateAccountPage}></Route>
                    <Route path="/mainPage" component={MainPage}></Route>

                </Switch>


        </div>
    )
}

export default PlaceHolder
