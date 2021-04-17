import React,{useContext, useState} from 'react'
import utils from '../../../Rest_API_utils/utils'
import {MembersSubsContext} from '../../Contexts/SubscriptionsContext'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

function AddMember(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')

    const [members,setMembers] = useContext(MembersSubsContext)

    let nevToAllMembers = function(){
        props.history.push('/mainPage/subscriptions')
    }

    let saveMember = async function(e){
        e.preventDefault()
        let obj = {
            name: name,
            email: email,
            city: city
        }

        await utils.addData("http://localhost:8001/api/users/subsapi/members", obj)

        alert("Member Added")

        let resp = await utils.getAllData("http://localhost:8001/api/users/subsapi/members")
        setMembers(resp.data)

        props.history.push('/mainPage/subscriptions')
    }

    return (
        <div>
            <h1>Add New Member</h1>

            <form onSubmit={saveMember}>

                <TextField onChange={e => setName(e.target.value)}
                    label="Name" variant="outlined"/>
                <br /> <br />

                <TextField onChange={e => setEmail(e.target.value)}
                    label="Email" variant="outlined"/>
                <br /> <br />

                
                <TextField onChange={e => setCity(e.target.value)}
                    label="City" variant="outlined"/>
                <br /> <br />

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    type="submit"
                    >
                    Save
                </Button>

                <Button 
                    variant="contained"
                    onClick={nevToAllMembers}
                    style={{marginLeft: "8px"}}
                    startIcon={<CancelIcon />}
                    >
                    Cancel
                </Button>
            </form>
        </div>
    )
}

export default AddMember
