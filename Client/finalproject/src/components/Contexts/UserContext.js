import React, {createContext, useState} from 'react'

export const UsersContext = createContext();

export default function UsersProvider(props) {

    const [currentUserData, setUserData] = useState({})
    const [allUsersData, setUsersData] = useState([])
    const [userDataToEdit, setUserDataToEdit] = useState({})



    return (
        <UsersContext.Provider value={
            [currentUserData, setUserData, allUsersData, setUsersData
            ,userDataToEdit, setUserDataToEdit]}>
            {props.children}
        </UsersContext.Provider>
    )
}
