import React from "react";
import './navComponent/pages.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Map from './navComponent/Map';
import Save from './navComponent/Save';
import Load from './navComponent/Load';
import Share from './navComponent/Share';

const Home = ({handleLogout}) => {

    return (
        <>
            {/* <section className="home">
            <nav>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <MyMap />;
            </section> */}
            <Router>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo'>
                    YorkU
                <i class='fab fa-firstdraft' />
                </Link>

                <ul className={'nav-menu active'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links'>
                        Home
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                        to='/save'
                        className='nav-links'
                        >
                        Save <i className='fas fa-caret-down' />
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                        to='/load'
                        className='nav-links'
                        >
                        Load
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                        to='/share'
                        className='nav-links'
                        >
                        Share
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <button className='logout nav-links' onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </nav>
            <Switch>
                <Route path='/' exact component={Map} />
                <Route path='/save' component={Save} />
                <Route path='/load' component={Load} />
                <Route path='/share' component={Share} />
                {/* <button className='logout' onClick={handleLogout}>Logout</button> */}
            </Switch>
            </Router>
        </>
    );
};

export default Home;