import * as React from 'react';
import { Route, Switch, Redirect, RouteComponentProps } from 'react-router-dom';
import { AvailableCars } from './Cars/AvailableCars';
import { CarDetails } from './Cars/CarDetails';
import { ErrorPage } from 'common/components/ErrorPage';
import 'common/styles.scss';

interface MatchParams {
    stockNumber: string;
}

interface MatchProps extends RouteComponentProps<MatchParams> {
}

export const Routes = () => (
    <main>
        <Switch>
            <Route path="/" exact component={AvailableCars}/>
            <Route
                path="/details/:stockNumber"
                exact
                render={
                    ({match}: MatchProps) => <CarDetails stockNumber={+match.params.stockNumber}/>
                }
            />
            <Route path="/purchase" exact component={ErrorPage}/>
            <Route path="/favorites" exact component={ErrorPage}/>
            <Route path="/sell" exact component={ErrorPage}/>
        </Switch>
    </main>
)
