import * as React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { AvailableCars } from './Cars/AvailableCars';
import { ErrorPage } from 'common/components/ErrorPage';
import 'common/styles.scss';

export const Routes = () => (
    <main className='main'>
        <Switch>
            <Route path="/" exact component={AvailableCars}/>
            <Route path="/purchase" exact component={ErrorPage}/>
            <Route path="/favorites" exact component={ErrorPage}/>
            <Route path="/sell" exact component={ErrorPage}/>
            <Redirect to="/"/>
        </Switch>
    </main>
)
