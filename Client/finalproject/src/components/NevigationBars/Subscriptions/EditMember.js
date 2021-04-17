import React,{useEffect,useState} from 'react'
import utils from '../../../Rest_API_utils/utils'

import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';



function EditMember(props) {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')


    useEffect(() => {

        setName(props.match.params.name)
        setEmail(props.match.params.email)
        setCity(props.match.params.city)
        
        
    }, [props.match.params.name])

    let nevToAllMembers = function(){
        props.history.push('/mainPage/subscriptions')
    }

    let updateMember = async function(e){
        e.preventDefault()
        let obj = {
            name: name,
            email: email,
            city: city
        }
        await utils.updateData(props.match.params.id, obj, "http://localhost:8001/api/users/subsapi/members/")

        alert(`${name} has been updated`)

        nevToAllMembers()
    }



    return (
        <div>
            <h1>Edit Member: {props.match.params.name}</h1>

            <form onSubmit={updateMember}>

                <TextField label="Name" value={name} variant="filled"
                onChange={e=> setName(e.target.value)}
                /> <br /> <br />

                <TextField label="Email" value={email} variant="filled"
                onChange={e=> setEmail(e.target.value)}
                /> <br /> <br />

                <TextField label="City" value={city} variant="filled"
                onChange={e=> setCity(e.target.value)}
                /> <br /> <br />

                <Button
                    variant="contained"
                    size="small"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                    type="submit"
                    >
                    Update
                </Button>

                <Button 
                    variant="contained"
                    size="small"
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

export default EditMember
