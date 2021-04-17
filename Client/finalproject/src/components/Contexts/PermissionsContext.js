import React, {createContext, useState, useEffect} from 'react'

export const UserPermissionsContext = createContext()

function PermissionsProvider(props) {

    const [hasDeleteMoviePer, setDeleteMoviePer] = useState(false)
    const [hasUpdateMoviePer, setUpdateMoviePer] = useState(false)

    const [hasDeleteSubPer, setDeleteSubPer] = useState(false)
    const [hasUpdateSubPer, setUpdateSubPer] = useState(false)


    return (
        <div>
            <UserPermissionsContext.Provider value={[hasDeleteMoviePer, setDeleteMoviePer,
            hasUpdateMoviePer, setUpdateMoviePer, hasDeleteSubPer, setDeleteSubPer,
            hasUpdateSubPer, setUpdateSubPer]}>
                {props.children}
            </UserPermissionsContext.Provider>
            
        </div>
    )
}

export default PermissionsProvider
