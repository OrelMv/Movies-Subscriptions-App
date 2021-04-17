import React, {useEffect, useState, useContext} from 'react'
import Movie from './Movie'
import {MoviesContext} from '../../Contexts/MoviesDataContext'

import '../../../css/AllMovies.css'

//Stateless components
function AllMovies(props) {

    const [moviesItems, setItems] = useState('')

    const [txtBox, setTxtBox] = useState('')

    const moviesData = useContext(MoviesContext)[2]

    useEffect(() => {

        let isMounted = true

        let mItems = moviesData.map((movie) => {
            return <div key={movie._id}>
                        <Movie data={movie} />
                    <br />
                </div>
            
        })
        if(isMounted){
            setItems(mItems)
        }

        return () => isMounted = false
      
    }, [moviesData])
    

    let nevToSearchPage = function(){
        if(txtBox != ""){
            props.history.push(`/mainPage/movies/search/${txtBox}`)
        }
        else{
            alert("Search box is empty")
        }
    }

    return (
        <div>
            <h1>All Movies</h1>

            Find Movie: <input type="text" placeholder="Search Movie..." onChange={e=> setTxtBox(e.target.value) } />
            
            <input type="button" value="Find" onClick={nevToSearchPage} />

            <br /> <br />

            {moviesItems}
            

        </div>
    )
}

export default AllMovies
