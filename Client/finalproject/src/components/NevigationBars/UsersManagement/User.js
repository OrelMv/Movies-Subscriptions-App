import React, {useEffect, useState, useContext} from 'react'
import '../../../css/User.css'
import {Link} from 'react-router-dom'
import utils from '../../../Rest_API_utils/utils'
import {UsersContext} from '../../Contexts/UserContext'

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function User(props) {

    const setUserDataToEdit = useContext(UsersContext)[5]

    const [userData, setData] = useState({})
    const [pers, setPers] = useState('')

    const setUsersData = useContext(UsersContext)[3]


    useEffect(() => {
        setData(props.data)

        let counter = 0;
        let permissions = props.data.permissions.map((per, index) => {
            counter++
            return <span key = {index}>{per}{props.data.permissions.length == counter? ".": ","}  </span>
        })
        setPers(permissions)
    }, [props.data])



    let sendUserDataToContext = function(){
        setUserDataToEdit(userData)
    }

    let deleteUser = async function(){
        alert(`${userData.userName} has been deleted`)
        await utils.deleteData(userData._id, "http://localhost:8001/api/users/")

        let resp = await utils.getAllData("http://localhost:8001/api/users")
        setUsersData(resp.data)
    }


    return (
        <div className="user">
            <b>Name: </b> {userData.firstName} {userData.lastName} <br />

            <b>User Name: </b> {userData.userName} <br />

            <b>Session time out (Minutes): </b> {userData.sessionTimeOut} <br />

            <b>Created Date: </b> {userData.createdDate} <br />

            <b>permissions: </b> {pers} <br /> <br />
            

            <Link to={`/mainPage/usersManagement/editUser`}>
                <Button
                    variant="contained"
                    color="default"
                    size="small"
                    endIcon={<EditIcon />}
                    onClick={sendUserDataToContext}>
                    Edit
                </Button>
            </Link>
            
            <Button
                variant="contained"
                size="small"
                color="secondary"
                endIcon={<DeleteIcon />}
                onClick={deleteUser}
                style={{marginLeft: "7px"}}>
                Delete
            </Button> 

            
            <br />
            <br />
        </div>
    )
}

export default User
