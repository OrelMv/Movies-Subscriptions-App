import React,{useEffect, useState, useContext} from 'react'
import {MoviesContext} from '../../Contexts/MoviesDataContext'
import Movie from './Movie'

function SearchMovie(props) {

    const [searchBox, setBox] = useState('')
    
    const movies = useContext(MoviesContext)[2]

    const [moviesItems, setMoviesItems] = useState('')



    useEffect(() => {

        setBox(props.match.params.txtBox)

        findMatchedMovies(props.match.params.txtBox)
        
        
        
    }, [props.match.params.txtBox, movies])


    let findMatchedMovies = function(searchBox){


        let matchedMovies = movies.filter(movie => {
            if(movie.name.toLowerCase().search(searchBox.toLowerCase()) > -1){
                return movie
            }
        })


        if(matchedMovies.length != 0){
            let mItems = matchedMovies.map((movie) => {
                return <div key={movie._id}>
                    <Movie data={movie} />
                    <br />
                </div>   
            })
            setMoviesItems(mItems)
        }

    }

    return (
        <div>
            <h1>Search Movie comp</h1>

            Find Movie: <input type="text" placeholder="Search Movie..." defaultValue={searchBox} onChange={e=> setBox(e.target.value)} />
            
            <input type="button" value="Find" onClick={() => findMatchedMovies(searchBox)} />

            <br /> <br />

            {moviesItems}

        </div>
    )
}

export default SearchMovie
