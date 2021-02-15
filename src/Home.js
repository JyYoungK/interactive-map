import React from "react";
import MyMap from "./mapComponent/MyMap";

const Home = ({handleLogout}) => {
    return (
        <div>
            <section className="home">
            <nav>
                <h2> Welcome</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <MyMap />;
            </section>
        </div>
    );
};

export default Home;