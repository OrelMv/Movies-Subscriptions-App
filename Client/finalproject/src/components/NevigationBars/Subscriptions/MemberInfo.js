import React,{useEffect, useState} from 'react'
import utils from '../../../Rest_API_utils/utils'
import Member from './Member'

function MemberInfo(props) {

    const [member, setMember] = useState({})

    useEffect(() => {

        let getMember= async() => {
            let member = await utils.getDataById(props.match.params.id, "http://localhost:8001/api/users/subsapi/members/")
            setMember(member)
        }

        getMember()

    }, [])


    return (
        <div>
            <br />

            {
                member? <Member data={member} />: ""
            }
            
        </div>
    )
}

export default MemberInfo
