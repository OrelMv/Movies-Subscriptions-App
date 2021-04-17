import React,{useEffect, useState, useContext} from 'react'
import utils from '../../../Rest_API_utils/utils'
import {Route, Switch} from 'react-router-dom'

import {UsersContext} from '../../Contexts/UserContext'
import {MoviesContext} from '../../Contexts/MoviesDataContext'
import {UserPermissionsContext} from '../../Contexts/PermissionsContext'
import {MembersSubsContext} from '../../Contexts/SubscriptionsContext'


import AllMovies from './AllMovies'
import SearchMovie from './SearchMovie'
import AddMovie from './AddMovie'

import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';

function MainComp(props) {

    const [userData] = useContext(UsersContext)
    let setDeleteMoviePer = useContext(UserPermissionsContext)[1]
    let setUpdateMoviePer = useContext(UserPermissionsContext)[3]

    let setMoviesData = useContext(MoviesContext)[3]
    let movies = useContext(MoviesContext)[2]

    const setMoviesSubscritions = useContext(MembersSubsContext)[7]

    const [hasViewMoviesPermissions, setViewPer] = useState(false)
    const [hasAddMoviesPermissions, setAddPer] = useState(false)

    useEffect(() => {

        let getAllMovies = async function(){
            let resp = await utils.getAllData("http://localhost:8001/api/users/subsapi/movies")
            let movies = resp.data
            
            if(isMounted){
                setMoviesData(movies)
            }
            
        }

        let isMounted = true

        getAllMovies()

        return () => isMounted = false

    }, [])

    useEffect(() => {

        let setSubscriptionsData = async function(){
            let resp = await utils.getAllData("http://localhost:8001/api/users/subsapi/subscriptions")
            
            if(isMounted){
                setMoviesSubscritions(resp.data.subsInfo.movieSubscribers)
            }
        }

        let isMounted = true
  
        setSubscriptionsData()

        return () => isMounted = false
  
        
    }, [movies])

   



    useEffect(() => {


        if(userData.usersPermissionsData != null){

            userData.usersPermissionsData.permissions.forEach(per => {
                if(per == "View Movies"){
                    setViewPer(true)
                }
                else if(per == "Create Movies"){
                    setAddPer(true)
                }
                else if(per == "Delete Movies" ){
                    setDeleteMoviePer(true)
                }
                else if(per == "Update Movies"){
                    setUpdateMoviePer(true)
                }
            })
            
        }


    }, [userData])


    return (
        <div>

            {
                hasViewMoviesPermissions? 
                    <Button variant="contained" color="secondary" 
                    onClick={()=> props.history.push('/mainPage/movies')}>
                        All Movies
                    </Button> : "You DO NOT have a permission to view movies"
            }
    
                
            {
                hasAddMoviesPermissions? 
                    <Button variant="contained" color="secondary" style={{marginLeft: "8px"}}
                    onClick={() => props.history.push('/mainPage/movies/addMovie')}
                    endIcon={<AddBoxIcon />}
                    >
                         Add Movie
                    </Button>
                : <span><br /> * You DO NOT have permission to add movies</span>
            }

            <br /> 

            
            <Switch>

                <Route path='/mainPage/movies/search/:txtBox' component={SearchMovie}></Route>

                <Route path='/mainPage/movies/addMovie' component={AddMovie}></Route>
                {
                    hasViewMoviesPermissions? <Route path="/mainPage/movies" component={AllMovies}></Route>:
                    ""
                }
     
            </Switch>
            
        </div>
    )
}

export default MainComp
