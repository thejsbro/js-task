import React from 'react';
import { NavLink } from 'react-router-dom';
import 'common/styles'

export const ErrorPage = () => (
    <div className='center'>
        <img width={150} className='margin-bottom--large' src='images/logo.png'/>
        <div  className='text-roboto--large-bold margin-bottom--large'>404 - Not Found</div>
        <div  className='text-roboto margin-bottom--large'>
            Sorry, the page you are looking for does not exist.
        </div>
        <div  className='text-roboto'>
            {'You can always go bac to the '}
            <NavLink className='text-link' to="/">homepage</NavLink>
            .
        </div>
    </div>
);
