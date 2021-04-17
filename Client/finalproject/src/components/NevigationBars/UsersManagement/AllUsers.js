import React, {useEffect, useState, useContext} from 'react'
import User from './User'
import {UsersContext} from '../../Contexts/UserContext'

function AllUsers() {

    const [usersItems, setItems] = useState('')

    const allUsersData = useContext(UsersContext)[2]
    
    useEffect(() => {


        if(allUsersData.logInInfo != null){
            let usersArray = []
            for(let i = 0; i < allUsersData.logInInfo.length; i++){
                if(allUsersData.logInInfo[i].userName == "admin"){
                    continue
                }
                let obj = {...allUsersData.logInInfo[i], ...allUsersData.usersJsonData[i], ...allUsersData.usersPermissionsData[i]}
                usersArray.push(obj)
    
            }
    
            let usersItems = usersArray.map(user => {
                if(user.password != ""){
                    return <div key={user._id}>
                        <User data={user} />
                        <br />
                    </div>
                }
                
            })
    
            setItems(usersItems)
        
        }

    }, [allUsersData])



    return (
        <div>
           <h1>All Users Comp</h1>

           {usersItems}
        </div>
    )
}

export default AllUsers
