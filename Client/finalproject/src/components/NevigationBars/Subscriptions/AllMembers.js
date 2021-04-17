import React, {useEffect, useContext, useState} from 'react'
import {MembersSubsContext} from '../../Contexts/SubscriptionsContext'
import Member from './Member'



function AllMembers() {

   const [members] = useContext(MembersSubsContext)
   const [membersItems, setMembersItems] = useState('')

   useEffect(() => {

        

        let membersItems = members.map(member => {
            return <div key={member._id}>
                    <Member data={member} />
                    <br />
                </div>
            })
        setMembersItems(membersItems)
    
   
   }, [members])

    return (
        <div>
            <h1>All Members</h1>

            {membersItems}
            
        </div>
    )
}

export default AllMembers
