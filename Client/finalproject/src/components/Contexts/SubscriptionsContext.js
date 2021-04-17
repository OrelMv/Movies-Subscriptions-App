import React, {createContext, useState } from 'react'

export const MembersSubsContext = createContext()

function MembersDataProvider(props) {

    const [members, setMembers] = useState([])

    const [membersSubscriptions, setMembersSubs] = useState([])

    const [membersMoviesNotWhatched, setMoviesNotWhatched] = useState([])

    const [movieSubscriptions, setMovieSubscriptions] = useState([])


    return (
        <div>
            <MembersSubsContext.Provider value={[members, setMembers, membersSubscriptions, setMembersSubs
            , membersMoviesNotWhatched, setMoviesNotWhatched, movieSubscriptions, setMovieSubscriptions]}>
                {props.children}
            </MembersSubsContext.Provider>
            
        </div>
    )
}

export default MembersDataProvider
