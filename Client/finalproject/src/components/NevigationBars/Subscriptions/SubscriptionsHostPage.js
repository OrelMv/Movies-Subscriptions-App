import React from 'react'
import {Switch, Route} from 'react-router-dom'

import MainSubsComp from './MainSubsComp'
import EditMember from './EditMember'

function SubscriptionsHostPage() {
    

    return (
        <div>
            <h1>Subscriptions</h1>

            <Switch>

                <Route path="/mainPage/subscriptions/editSubscription/:id/:name/:email/:city" component={EditMember}></Route>

                <Route path="/mainPage/subscriptions" component={MainSubsComp}></Route>

            </Switch>


        </div>
    )
}

export default SubscriptionsHostPage
