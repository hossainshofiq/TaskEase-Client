import React from 'react';
import Navbar from '../components/Navbar';
import TaskDashboard from '../components/TaskDashboard';

const Home = () => {

    return (
        <div>
            <Navbar></Navbar>
            <TaskDashboard></TaskDashboard>
        </div>
    );
};

export default Home;