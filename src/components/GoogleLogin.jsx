import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { GrTasks } from 'react-icons/gr';
import loginImage from '../assets/login-logo.png'
import { FaGoogle } from 'react-icons/fa';

const GoogleLogin = () => {

    const { googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);
                // alert('login done');

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login successful",
                    showConfirmButton: false,
                    timer: 1500
                });

                const userInfo = {
                    uid: result.user?.uid,
                    email: result.user?.email,
                    displayName: result.user?.displayName,
                    photoURL: result.user?.photoURL
                }
                axiosSecure.put('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                    })

            })

        navigate('/')
    }

    return (
        <div>
            <div>

                <div
                    className="hero min-h-screen"
                    style={{
                        backgroundImage: "url(https://img.daisyui.com/images/stock/photo-1507358522600-9f71e620c44e.webp)",
                    }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className='card bg-base-300 p-6 space-y-2'>
                        <h4 className="font-bold text-blue-600 text-center flex items-center justify-center gap-2"><GrTasks></GrTasks> TaskEase</h4>

                        <h2 className='font-bold text-3xl text-center'>Welcome back</h2>
                        <img src={loginImage} alt="" />
                        <button onClick={handleGoogleLogin} className="btn bg-blue-600 text-white hover:bg-blue-700">
                            <FaGoogle></FaGoogle>
                            Login with Google
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default GoogleLogin;