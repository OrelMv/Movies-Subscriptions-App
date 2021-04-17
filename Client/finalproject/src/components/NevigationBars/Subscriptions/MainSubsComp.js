import React, {useEffect, useContext, useState} from 'react'
import {Switch, Route} from 'react-router-dom'

import {MembersSubsContext} from '../../Contexts/SubscriptionsContext'
import {UserPermissionsContext} from '../../Contexts/PermissionsContext'
import {UsersContext} from '../../Contexts/UserContext'

import AllMembers from './AllMembers'
import AddMember from './AddMember'
import MemberInfo from './MemberInfo'
import utils from '../../../Rest_API_utils/utils'

import Button from '@material-ui/core/Button';
import PersonAddIcon from '@material-ui/icons/PersonAdd';


function MainSubsComp(props) {

    const [members, setMembers, membersSubs, setMembersSubs,
        membersMoviesNotWhatched, setMembersMoviesNotWhatched] = useContext(MembersSubsContext)


    const setUpdateSubPer = useContext(UserPermissionsContext)[7]
    const setDeleteSubPer = useContext(UserPermissionsContext)[5]
    const [hasViewSubPer, setViewSubPer] = useState(false)
    const [hasAddSubPer, setAddSubPer] = useState(false)

    const [userData] = useContext(UsersContext)

    

    useEffect(() => {

        let isMounted = true
       
        let getAllMembers = async function(){
            
            let resp = await utils.getAllData("http://localhost:8001/api/users/subsapi/members")

            if(isMounted){
                setMembers(resp.data)  
            }
            
        }

        getAllMembers()
       
        return () => isMounted = false
        
    }, [])

    useEffect(() => {

        let isMounted = true

        let setSubscriptionsData = async function(){

            let resp = await utils.getAllData("http://localhost:8001/api/users/subsapi/subscriptions")

            if(isMounted){
                setMembersSubs(resp.data.membersSubscriptions)
                setMembersMoviesNotWhatched(resp.data.subsInfo.memberMoviesNotWhatched)
            }
            
        }


        setSubscriptionsData()

        return () => isMounted = false

    }, [members])



    useEffect(() => {

        if(userData.usersPermissionsData != null){

                userData.usersPermissionsData.permissions.forEach(per => {
                    if(per == "View Subscriptions"){
                        setViewSubPer(true)
                    }
                    else if(per == "Create Subscriptions"){
                        setAddSubPer(true)
                    }
                    else if(per == "Delete Subscriptions"){
                        setDeleteSubPer(true)
                    }
                    else if(per == "Update Subscriptions"){
                        setUpdateSubPer(true)
                    }
                })
            
        }

    },[userData])

    return (
        <div>
            {
                hasViewSubPer?
                    <Button variant="contained" color="secondary" onClick={() => props.history.push('/mainPage/subscriptions')}>All Members</Button>
                : "You DO NOT have permission to view subscriptions" 
            }
            
            {
                hasAddSubPer?
                    <Button variant="contained" color="secondary" style={{marginLeft: "8px"}}
                    onClick={() => props.history.push('/mainPage/subscriptions/addMember')}
                    endIcon={<PersonAddIcon />}
                    >
                        Add Member
                    </Button>
                : <span><br />You DO NOT have permission to add subscribers</span>
            }
            
            

            <Switch>

                <Route path="/mainPage/subscriptions/addMember" component={AddMember}></Route>

                <Route path="/mainPage/subscriptions/memberInfo/:id" component={MemberInfo}></Route>

                {
                    hasViewSubPer? 
                    <Route path="/mainPage/subscriptions" component={AllMembers}></Route>
                    :""
                }


            </Switch>

        </div>
    )
}

export default MainSubsComp
