import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '../server';
import { Header } from 'common/components/Header';
import { Footer } from 'common/components/Footer';
import { Routes } from './routes';
import { Provider } from 'react-redux';
import {store} from 'common/store';
import 'common/styles.scss'

const App = () => (
    <div className='body'>
        <Header />
        <Routes />
        <Footer />
    </div>
)

render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
