import React from 'react';
import Navbar from '../components/Navbar';
import DashboardTask from '../components/DashboardTask';
import Footer from '../components/Footer';


const Home = () => {

    return (
        <div>
            <Navbar></Navbar>
            <DashboardTask></DashboardTask>
            <Footer></Footer>
        </div>
    );
};

export default Home;