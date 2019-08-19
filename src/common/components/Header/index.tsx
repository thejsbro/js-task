import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss'

export const Header = () => (
    <header
        className='header'
    >
            <NavLink className='header__logo' to="/">Auto1.com</NavLink>
            <ul className='header__navigation'>
                <li ><NavLink to="/purchase" exact>Purchase</NavLink></li>
                <li ><NavLink to="/favorites" exact>My Orders</NavLink></li>
                <li ><NavLink to="/sell" exact>Sell</NavLink></li>
            </ul>
    </header>
);
