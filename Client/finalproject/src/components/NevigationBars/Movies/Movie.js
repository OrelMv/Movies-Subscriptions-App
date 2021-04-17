import React,{useEffect, useState, useContext} from 'react'
import {Link} from 'react-router-dom'
import {MoviesContext} from '../../Contexts/MoviesDataContext'
import '../../../css/Movie.css'
import utils from '../../../Rest_API_utils/utils'
import {UserPermissionsContext} from '../../Contexts/PermissionsContext'
import {MembersSubsContext} from '../../Contexts/SubscriptionsContext'

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

function Movie(props) {

    const [year, setYear] = useState('')
    const [genresItems, setGenresItems] = useState('')

    let hasDeleteMoviePermission = useContext(UserPermissionsContext)[0]
    let hasUpdateMoviePermission = useContext(UserPermissionsContext)[2]
    const [movieDataToEdit, setMovieDataToEdit, allMoviesData, setAllMoviesData] = useContext(MoviesContext)

    let movieSubscribers = useContext(MembersSubsContext)[6]

    const [membersItems, setMembersItems] = useState('')

    useEffect(() => {
        

        let getSubscribersData = async function(){
            let currentMovie = movieSubscribers.filter(movie => movie.movieId == props.data._id)
            let membersData = []
            if(currentMovie[0] != null){
                for(let i = 0; i < currentMovie[0].members.length; i++){
                    let member = await utils.getDataById(currentMovie[0].members[i].memberId, "http://localhost:8001/api/users/subsapi/members/")
                    membersData.push({member: member, date: currentMovie[0].members[i].date })
                }
  
                let membersItems = membersData.map((member) => {
                    
                    if(member != null){
                        return <li key ={member.member._id}>
                            <b><Link to={`/mainPage/subscriptions/memberInfo/${member.member._id}`}>
                                {member.member.name}</Link>
                                , {member.date}</b> 
                        </li>
                    }
                })
                if(isMounted){
                    setMembersItems(membersItems)
                }
                
                
            }
        }

        let isMounted = true

        getSubscribersData()

        return () => isMounted = false
  
  
    }, [movieSubscribers])



    useEffect(() => {

        let date = new Date(props.data.premiered)
        let year = date.getFullYear()
        
        let counter = 0;

        let genresItems = props.data.genres.map((genre) => {
            counter++;
            return <span key={counter}>{genre} {counter==props.data.genres.length? "": ","}</span>
        })

        setYear(year)
        setGenresItems(genresItems)        


    },[])

    let deleteMovie = async function(){
        await utils.deleteData(props.data._id, "http://localhost:8001/api/users/subsapi/movies/")
        let resp = await utils.getAllData("http://localhost:8001/api/users/subsapi/movies")
        setAllMoviesData(resp.data)
        alert(`${props.data.name} has been deleted`)

    }


    return (
        <div className="movie">
            <b><div style={{fontSize: "30px"}}>{props.data.name}, {year}</div></b> <br />

            genres: {genresItems} <br /> <br />

            <div style={{display: 'flex'}}>
                <div>
                    <img src={props.data.image} style={{width:"200px", height:"230px"}} /> <br />
                </div>

                <div>
                    <div style={{fontSize:"25px"}}>Subscriptions Whatched</div>
                    <ul>
                        {membersItems}
                    </ul>
                </div>
            </div>

            

            
            <br />

            {
                hasUpdateMoviePermission? 
                <Link to={`/mainPage/movies/editMovie`}>
                    <Button
                        variant="contained"
                        color="default"
                        size="small"
                        endIcon={<EditIcon />}
                        onClick={()=>setMovieDataToEdit(props.data) }
                    >
                        Edit
                    </Button>
                </Link>
                : ""    
            }

            {
                hasDeleteMoviePermission? 
                <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    endIcon={<DeleteIcon />}
                    onClick={deleteMovie}
                    style={{marginLeft: "7px"}}
                >
                    Delete
                </Button> 
                    :""
            }

            
        </div>
    )
}

export default Movie
