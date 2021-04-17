import React, {useContext, useState, useEffect} from 'react'
import {UserPermissionsContext} from '../../Contexts/PermissionsContext'
import {MembersSubsContext} from '../../Contexts/SubscriptionsContext'
import '../../../css/Member.css'
import {Link} from 'react-router-dom'
import utils from '../../../Rest_API_utils/utils'

import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';


function Member(props) {


    const hasDeleteSubPer = useContext(UserPermissionsContext)[4]
    const hasUpdateSubPer = useContext(UserPermissionsContext)[6]

    const [members, setMembers, membersSubscriptions,
         setMembersSubs, memberMoviesNotWhatched, setMoviesNotWhatched ] = useContext(MembersSubsContext)


    const [memberSubs, setMemberSubs] = useState({})

    const [subBtnClicked, setBtn] = useState(false)

    const [moviesNotWhatchedItems, setItems] = useState('')
    const [moviesSubscribedItems, setMoviesSubItems] = useState('')
    const [selectedMovie, setSelectedMovie] = useState('')
    const [date, setDate] = useState('')
    

    useEffect(() => {

        

        let getMemberSubscriptionsData = async() => {
            
            if(currentMemberSubs[0] != null){
                let movies = []
                for(let i = 0; i < currentMemberSubs[0].movies.length; i++){
                    let movieData = await utils.getDataById(currentMemberSubs[0].movies[i].movieId, "http://localhost:8001/api/users/subsapi/movies/")
                    movies.push({movie: movieData, date: currentMemberSubs[0].movies[i].date })
                }

                let movieSubItems = movies.map((currentMovie) => {
                    if(currentMovie != null){
                        let date = new Date(currentMovie.date)

                        return <li key ={currentMovie.movie._id}>
                            <Link to={`/mainPage/movies/search/${currentMovie.movie.name}`}>
                                <b>{currentMovie.movie.name}</b>
                            </Link>
                            , {date.toLocaleDateString()}
                        </li>
                    }
                })
                if(isMounted){
                    setMoviesSubItems(movieSubItems)
                }
                
            }  
        }

            let isMounted = true
 
            let currentMemberSubs = membersSubscriptions.filter(member => member.memberId == props.data._id)

            let currentMemberMoviesNotWhatched = memberMoviesNotWhatched.filter(member => member.memberId == props.data._id)
    
            if(currentMemberMoviesNotWhatched[0] != null){
                let moviesNotWhatchedItems = currentMemberMoviesNotWhatched[0].moviesNotWhatched.map(movie => {
                    return <option key={movie.movieId} value={movie.movieId}>
                        {movie.name}
                    </option>
                })

                if(isMounted){
                    setMemberSubs(currentMemberSubs[0])
                    setItems(moviesNotWhatchedItems)
                }
               
            }
    
            getMemberSubscriptionsData()

            return () => isMounted = false
            
           

    }, [membersSubscriptions, memberMoviesNotWhatched])

    

    let deleteMember = async function(){
        await utils.deleteData(props.data._id, "http://localhost:8001/api/users/subsapi/members/")

        let resp = await utils.getAllData("http://localhost:8001/api/users/subsapi/members")

        await utils.deleteData(memberSubs._id, "http://localhost:8001/api/users/subsapi/subscriptions/")

        setMembers(resp.data)

        alert(`${props.data.name} has been deleted`)
    }


    let subscribeToMovie = async function(){
        let obj = {
            memberId: props.data._id,
            movieId: selectedMovie,
            date: date
        }
        if(selectedMovie != "" && date != ""){
            await utils.updateData(memberSubs._id, obj, "http://localhost:8001/api/users/subsapi/subscriptions/")

            let allSubsData = await utils.getAllData("http://localhost:8001/api/users/subsapi/subscriptions")
    
            let movie = await utils.getDataById(selectedMovie, "http://localhost:8001/api/users/subsapi/movies/")
    
            alert(`${props.data.name} just subscribed to ${movie.name}`)
    
            setMembersSubs(allSubsData.data.membersSubscriptions)
            setMoviesNotWhatched(allSubsData.data.subsInfo.memberMoviesNotWhatched)
        }
        else{
            alert("Something went wrong")
        }
        

        
    }

    return (
        <div className="member">

            <h2>{props.data.name}</h2>

            Email: {props.data.email}  <br />

            City: {props.data.city} <br /> <br />

            {
                hasUpdateSubPer? 
                <Link to={`/mainPage/subscriptions/editSubscription/${props.data._id}/${props.data.name}/${props.data.email}/${props.data.city}`}>
                    <Button
                        variant="contained"
                        color="default"
                        size="small"
                        endIcon={<EditIcon />}>
                        Edit
                    </Button>
                </Link>
                : ""
            }

            {
                hasDeleteSubPer? 
                <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    endIcon={<DeleteIcon />}
                    onClick={deleteMember}
                    style={{marginLeft: "7px"}}>
                    Delete
                </Button>
                :""
            }


            <br /> <br />

            <div style={{fontSize:"25px"}}>Movies Whatched</div> 
            <br />

            <Button
                variant="contained"
                color="primary"
                size="small"
                endIcon={<SubscriptionsIcon />}
                onClick={()=> setBtn(!subBtnClicked)}
            >
                Subscribe To A New Movie
            </Button>

            <br /> <br />
            {
                subBtnClicked? <div className="subscription">
                    <b>ADD NEW MOVIE</b> <br /> 

                    <select onChange={e => setSelectedMovie(e.target.value)}>
                        <option value="">Select Movie</option>
                        {moviesNotWhatchedItems}
                    </select>
                    <br /> <br />

                    <TextField
                    size="small"
                    onChange={e => setDate(e.target.value)}
                    label="Movie Date" variant="outlined" />

                    <br /> <br />
                    <Button 
                        variant="contained"
                        size="small"
                        onClick={subscribeToMovie}
                        endIcon={<SubscriptionsIcon />}
                        >Subscribe
                    </Button>
                    
                    <br />
                    <br />
                </div>: ""
    
            }


            <ul>
                {moviesSubscribedItems}
            </ul>
            

        </div>
    )
}

export default Member
