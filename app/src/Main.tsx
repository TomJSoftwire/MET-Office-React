import React from 'react';
import {Switch, Route} from 'react-router-dom';

import LocationForecastPage from './LocationForecastPage'

const Main = () => {
    return(
        <Switch>
            <Route exact path="/" component={LocationForecastPage}></Route>
        </Switch>
    )
}

export default Main;