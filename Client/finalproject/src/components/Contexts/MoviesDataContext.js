import React, {createContext, useState} from 'react'

export const MoviesContext = createContext()

function MovieDataProvider(props) {

    const [movieDataToEdit, setDataToEdit] = useState({})
    const [allMovies, setAllMovies] = useState([])

    return (
        <div>
            <MoviesContext.Provider value={[movieDataToEdit, setDataToEdit, allMovies, setAllMovies]}>
                {props.children}
            </MoviesContext.Provider>
            
        </div>
    )
}

export default MovieDataProvider
