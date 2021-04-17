import React from 'react'
import {Switch, Route} from 'react-router-dom'
import MainComp from './MainComp'
import EditMovie from './EditMovie'

import MoviesProvider from '../../Contexts/MoviesDataContext'

function MoviesHostPage() {


    return (
        <div>
            <h1>Movies</h1>

            <MoviesProvider>

                <Switch>

                    <Route path="/mainPage/movies/editMovie" component={EditMovie}></Route>

                    <Route path="/mainPage/movies" component={MainComp}></Route>
                    
                </Switch>
                
            </MoviesProvider>

        </div>
    )
}

export default MoviesHostPage
