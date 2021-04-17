import React,{useEffect, useContext, useState} from 'react'
import {MoviesContext} from '../../Contexts/MoviesDataContext'
import utils from '../../../Rest_API_utils/utils'

import TextField from '@material-ui/core/TextField';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel';

function EditMovie(props) {

    const [movieData] = useContext(MoviesContext)

    const [name, setName] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [premiered, setPremiered] = useState('')
    const [genres, setGenres] = useState('')

    useEffect(() => {

        setName(movieData.name)
        setGenres(movieData.genres)
        setImgUrl(movieData.image)
        let date = new Date(movieData.premiered)
        setPremiered(date.toLocaleDateString())

        let str = ""
        movieData.genres.forEach(genre => {
            str+=genre+","
        })

        setGenres(str)

    }, [])


    let nevToAllMoviesPage = () => {
        props.history.push('/mainPage/movies')
    }

    let convertGenresToArray = () => {
        let genresArray = []
        let word = ""
        for(let i = 0; i < genres.length; i++){
            if(genres[i] != ","){
                word+=genres[i];
            }
            else if(word != ""){
                genresArray.push(word)
                word = ""
            }
        }
        genresArray.push(word)
        return genresArray
    }

    let updateMovie = async() =>{
        let obj = {
            name: name,
            genres: convertGenresToArray(),
            image: imgUrl,
            premiered: premiered
        }

        await utils.updateData(movieData._id, obj, "http://localhost:8001/api/users/subsapi/movies/")
        alert("Movie Updated")
        nevToAllMoviesPage()

    }


    return (
        <div>
            <h1>Edit Movie: {movieData.name}</h1>

            <form onSubmit={updateMovie}>

                <TextField label="Name" value={name} variant="filled"
                    onChange={e=> setName(e.target.value)}/> 
                <br /> <br />

                <TextField label="Genres" value={genres} variant="filled"
                    onChange={e=> setGenres(e.target.value)}/> 
                <br /> <br />

                <TextField label="Image Url" value={imgUrl} variant="filled"
                    onChange={e=> setImgUrl(e.target.value)}/>
                <br /> <br />

                <TextField label="Premiered:(MM-DD-YYYY)" value={premiered} variant="filled"
                    onChange={e=> setPremiered(e.target.value)} />
                <br /> <br />


                <Button
                    variant="contained"
                    size="small"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                    type="submit"
                    >
                    Update
                </Button>

                <Button 
                    variant="contained"
                    size="small"
                    onClick={nevToAllMoviesPage}
                    style={{marginLeft: "8px"}}
                    startIcon={<CancelIcon />}
                    >
                    Cancel
                </Button>

            </form>

        </div>
    )
}

export default EditMovie
