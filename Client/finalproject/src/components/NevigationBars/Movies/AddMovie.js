import React, {useState, useContext} from 'react'
import utils from '../../../Rest_API_utils/utils'
import {MoviesContext} from '../../Contexts/MoviesDataContext'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

function AddMovie(props) {

    const [name, setName] = useState('')

    const [genres, setGenres] = useState('')

    const [imgUrl, setUrl] = useState('')

    const [premiered, setPremiered] = useState('')

    const setMoviesData = useContext(MoviesContext)[3]

    let nevToAllMovies = function(){
        props.history.push('/mainPage/movies')
    }

    let convertStrToArray = function(){
        let genresArray = []
        let word = ""
        for(let i = 0; i < genres.length; i++){
            if(genres[i] != ','){
                word+=genres[i]
            }
            else if(word != ""){
                genresArray.push(word)
                word = ""
            }
        }
        genresArray.push(word)
        return genresArray
    }

    let addMovie = async function(e){
        e.preventDefault()
        let obj = {
            name: name,
            genres: convertStrToArray(),
            image: imgUrl,
            premiered: premiered
        }
        await utils.addData("http://localhost:8001/api/users/subsapi/movies", obj)
        
        let updatedMovies = await utils.getAllData("http://localhost:8001/api/users/subsapi/movies")
        setMoviesData(updatedMovies.data)
        
        alert("Movie Added")
        nevToAllMovies()
    }

    return (
        <div>
            <h1>Add Movie</h1>

            <form onSubmit={addMovie}>
                <TextField onChange={e => setName(e.target.value)}
                    label="Name" variant="outlined" size="small"/>
                <br /> <br />

                <TextField onChange={e => setGenres(e.target.value)}
                    label="Genres" variant="outlined" size="small"/>
                <br /> <br />

                <TextField onChange={e => setUrl(e.target.value)}
                    label="Image Url" variant="outlined" size="small"/>
                <br /> <br />

                <TextField onChange={e => setPremiered(e.target.value)}
                    label="Premiered:(YYYY-MM-DD)" variant="outlined" size="small"/>
                <br /> <br />

                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    type="submit"
                    >
                    Save
                </Button> 

                <Button 
                    variant="contained"
                    onClick={nevToAllMovies}
                    style={{marginLeft: "8px"}}
                    startIcon={<CancelIcon />}
                    >
                    Cancel
                </Button>

            </form>

        </div>
    )
}

export default AddMovie
