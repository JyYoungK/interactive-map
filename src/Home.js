import React, {useState} from "react";
import './navComponent/pages.css';
import './Modal.css';
import { useAuth } from "./auth-context";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import LoadMap from './navComponent/LoadMap';
import Share from './navComponent/Share';
import Modal from 'react-modal';

const Home = (props) => {
    const [listofcountries, setlistofcountries] = useState([]);
    const [countries, setCountries] = useState([]);
    const { setMapTitle, countryISOData } = useAuth();
    const {handleLogout, save} = props;
    const [saveModalIsOpen, setSaveModalIsOpen] = useState(false);
    const [LoadModalIsOpen, setLoadModalIsOpen] = useState(false);
    const [CompareModalIsOpen, setCompareModalIsOpen] = useState(false);
    const modalStyle = {
        overlay: {
            zIndex: 10,
        },
        content: {
            position: 'absolute',
            top: '35%',
            left: '40%',
            right: '40%',
            bottom: '35%',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            zIndex: 10,
        }
    };
    const modalStyle2 = {
        overlay: {
            zIndex: 10,
        },
        content: {
            position: 'absolute',
            top: '15%',
            left: '15%',
            right: '15%',
            bottom: '15%',
            border: '1px solid #ccc',
            backgroundColor: 'white',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px',
            zIndex: 10,
        }
    };

    function moreThanOneCountry(){
        if (countryISOData.length >= 1) {
            setSaveModalIsOpen(true);
        }
        else{
            alert("In order to save, something has to be changed in the map!")
        }
    }

    function moreThanTwoCountries(){
        if (countryISOData.length >= 2 ) {
            for (var i = 0; i < countryISOData.length - 1; i++) {
                console.log(countryISOData[i].obj.feature.properties.ADMIN)
                listofcountries.push(countryISOData[i].obj.feature.properties.ADMIN + " and ")
            }
            listofcountries.push(countryISOData[countryISOData.length-1].obj.feature.properties.ADMIN)
            setCompareModalIsOpen(true);
        }
        else{
            alert("Please select at least 2 countries to compare!")
        }
    }

    function closeComparison(){
        setCompareModalIsOpen(false)
        setlistofcountries([]);
    }

    return (
        <>
            <Router>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo'>
                    YorkU MyMap
                </Link>

                <ul className={'nav-menu active'}>
                    {/* <li className='nav-item'>
                        <Link to='/' className='nav-links'>
                        Home
                        </Link>
                    </li> */}
                    <li className='nav-item'>
                        <button className='logout nav-links' onClick={moreThanOneCountry}>Save</button>
                        <Modal isOpen={saveModalIsOpen} //Modal open depends on setModal
                        ariaHideApp={false} //Hides annoying error
                        onRequestClose={() => setSaveModalIsOpen(false)} //Closes the modal if clicked outside of modal or esc
                        style={ modalStyle }
                        transparent = {false}
                        >
                            <div className="saveContents">
                                <h2 style={{margin: "5%"}}> Save </h2>
                                <p>Name of the map </p>
                                <input type="text" placeholder="Your map name.." style={{marginTop: "5%", height: "200%"}} onChange={event => setMapTitle(event.target.value)}/>
                                <div className="saveButtons">
                                    <button onClick={save}>Save</button> 
                                    <button onClick = {() => setSaveModalIsOpen(false)}> Close </button>
                                </div>
                            </div>
                        </Modal>
                    </li>
                    <li className='nav-item'>
                    <button className='logout nav-links' onClick={() => setLoadModalIsOpen(true)}>Load</button>
                        <Modal isOpen={LoadModalIsOpen} //Modal open depends on setModal
                        ariaHideApp={false} //Hides annoying error
                        onRequestClose={() => setLoadModalIsOpen(false)} //Closes the modal if clicked outside of modal or esc
                        style={ modalStyle }
                        transparent = {false}
                        >
                            <div className="saveContents">
                                <h2 style={{margin: "5%"}}> Load </h2>
                                <p>Name of the map </p>
                                <p> Search </p>
                                <div className="saveButtons">
                                    <button>Load</button> 
                                    <button onClick = {() => setLoadModalIsOpen(false)}> Close </button>
                                </div>
                            </div>
                        </Modal>
                    </li>
                    <li className='nav-item'>
                    <button className='logout nav-links' onClick={moreThanTwoCountries}>Compare</button>
                        <Modal isOpen={CompareModalIsOpen} //Modal open depends on setModal
                        ariaHideApp={false} //Hides annoying error
                        onRequestClose={() => setCompareModalIsOpen(false)} //Closes the modal if clicked outside of modal or esc
                        style={ modalStyle2 }
                        transparent = {false}
                        >
                            <div className="compareContents">
                                <h2 style={{margin: "5%"}}> Compare </h2>
                                <p>Comparison of the following countries: </p>
                                <p> {listofcountries} </p>
                                <div className="compareButtons">
                                    <button onClick = {closeComparison}> Close </button>
                                </div>
                            </div>
                        </Modal>
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
                <Route path='/' exact component={LoadMap} />
                <Route path='/share' component={Share} />
                {/* <button className='logout' onClick={handleLogout}>Logout</button> */}
            </Switch>
            </Router>
        </>
    );
};

export default Home;