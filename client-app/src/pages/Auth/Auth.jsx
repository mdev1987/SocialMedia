import React from 'react';
import './Auth.css';
import Logo from '../../img/logo.png';

function Auth() {
    return (
        <div className="Auth">
            <div className="a-left">
                <img src={Logo} alt="logo" />
                <div className="Webname">
                    <h1>ZKC Media</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>

            <Login />
        </div>
    )
}

function SignUp() {
    return (
        <div className="a-right">
            <form className="infoForm authForm">
                <h3>Sign Up</h3>
                <div>
                    <input type="text"
                        autoFocus
                        name='firstname'
                        className='infoInput'
                        placeholder='First Name' />

                    <input type="text"
                        name='lastname'
                        className='infoInput'
                        placeholder='Last Name' />
                </div>
                <div>
                    <input type="text"
                        name='username'
                        className='infoInput'
                        placeholder='User Name' />
                </div>
                <div>
                    <input type="text"
                        name='password'
                        className='infoInput'
                        placeholder='Password' />

                    <input type="text"
                        name='confirmpass'
                        className='infoInput'
                        placeholder='Confirm Password' />
                </div>
                <div>
                    <span>Already have an account? <a href='#'><strong>Login</strong></a></span>
                </div>
                <button className='button infoButton' type='submit'>Signup</button>
            </form>
        </div>
    )
}

function Login() {
    return (
        <div className="a-right">
            <form className="infoForm authForm">
                <h3>Login</h3>
                <div>
                    <input type="text"
                        autoFocus
                        name='username'
                        className='infoInput'
                        placeholder='User Name' />
                </div>
                <div>
                    <input type="text"
                        name='password'
                        className='infoInput'
                        placeholder='Password' />
                </div>
                <div>
                    <span>Don't have an account? <a href='#'><strong>Sign Up</strong></a></span>
                    <button className='button infoButton' type='submit'>Login</button>
                </div>              
            </form>
        </div>
    )
}



export default Auth