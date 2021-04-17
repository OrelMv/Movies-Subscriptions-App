import React, {useContext, useEffect} from 'react'
import {Switch, Route} from 'react-router-dom'

import {UsersContext} from './Contexts/UserContext'
import utils from '../Rest_API_utils/utils'

import MoviesHostPage from './NevigationBars/Movies/MoviesHostPage';
import UsersManagementHost from './NevigationBars/UsersManagement/UsersManagementHost'
import SubscriptionsHostPage from './NevigationBars/Subscriptions/SubscriptionsHostPage'


import PermissionsProvider from './Contexts/PermissionsContext'
import SubscriptionsProvider from './Contexts/SubscriptionsContext'

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import GroupIcon from '@material-ui/icons/Group';
import MovieIcon from '@material-ui/icons/Movie';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


function MainPage(props) {

    const [userData, setUserData] = useContext(UsersContext)


    useEffect(() => {

        let getUserData = async() => {
            let userId = localStorage.getItem('userId');
            if(userId){
                let currentUserData = await utils.getDataById(userId, "http://localhost:8001/api/users/")
                setUserData(currentUserData)
            }
        }   
        getUserData()
        
    }, [])
    

    return (
        <div>
            <h3>Welcome, {userData.logInInfo? userData.logInInfo.userName: ""}</h3>

            <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">

                <Button onClick={() => props.history.push('/mainPage/movies')}
                endIcon={<MovieIcon />}>
                    Movies
                </Button>

                <Button onClick={() => props.history.push('/mainPage/subscriptions')}
                endIcon={<SubscriptionsIcon />}>
                    Subscriptions
                </Button>

                {
                    //if userdata.logininfo is null --> "", else if the user name is admin --> present usersManage, else --> "" 
                    userData.logInInfo? 
                        userData.logInInfo.userName=="admin"?

                        <Button onClick={() => props.history.push('/mainPage/usersManagement')}
                        endIcon={<GroupIcon />}>
                            Users Management
                        </Button>

                        : ""
                    : ""
                }

                <Button onClick={() => props.history.push('/')}
                endIcon={<ExitToAppIcon />}>
                    Log Out
                </Button>


            </ButtonGroup>


                <PermissionsProvider>

                    <SubscriptionsProvider>

                        <Switch>

                            <Route path="/mainPage/movies" component={MoviesHostPage} />

                            <Route path="/mainPage/usersManagement" component={UsersManagementHost} />

                            <Route path="/mainPage/subscriptions" component={SubscriptionsHostPage}></Route>
                            
                        </Switch>

                    </SubscriptionsProvider>
                    
                </PermissionsProvider>
            
            
        </div>
    )
}

export default MainPage
