import React, { useState } from 'react';
import './Auth.css';
import Logo from '../../img/logo.png';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signUp, logIn } from '../../reducers/authReducer';

function Auth() {
    const [isSignUp, setIsSignUp] = useState(false);
    const { loading, authData } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = event => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    const handleSignUpLogin = (event) => {
        event.preventDefault();
        setIsSignUp(!isSignUp)
    }

    const onSumbitData = (event) => {
        event.preventDefault();
        if (isSignUp) {
            if (checkPasswordAndConfirmPass()) {
                dispatch(signUp(formData)).then(response => {
                    const { success, message, data } = response.payload;
                    if (success) {
                        localStorage.setItem('authData', JSON.stringify(data))
                        navigate('/')
                    } else {
                        toast.error(message);
                    }
                })
            }
        } else {
            dispatch(logIn(formData)).then(response => {
                const { success, message, data } = response.payload;
                if (success) {
                    localStorage.setItem('authData', JSON.stringify(data))
                    navigate('/')
                } else {
                    toast.error(message);
                }
            })
        }
    }

    const checkPasswordAndConfirmPass = () => {
        if (formData.password === formData.confirmPassword) return true
        toast.error('Confirm Password is not same!');
        return false
    }


    return (
        <div className="Auth">
            <div className="a-left">
                <img src={Logo} alt="logo" />
                <div className="Webname">
                    <h1>ZKC Media</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>

            <div className="a-right">
                <form onSubmit={onSumbitData} className="infoForm authForm">
                    <h3>{isSignUp ? 'Sign Up' : 'Login'}</h3>
                    {isSignUp &&
                        <div>
                            <input type="text"
                                autoFocus
                                name='firstname'
                                onChange={handleChange}
                                className='infoInput'
                                placeholder='First Name' />

                            <input type="text"
                                name='lastname'
                                onChange={handleChange}
                                className='infoInput'
                                placeholder='Last Name' />
                        </div>
                    }
                    <div>
                        <input type="text"
                            name='username'
                            onChange={handleChange}
                            className='infoInput'
                            placeholder='User Name' />
                    </div>
                    <div>
                        <input type="password"
                            name='password'
                            onChange={handleChange}
                            className='infoInput'
                            placeholder='Password' />
                        {isSignUp &&
                            <input type="password"
                                name='confirmPassword'
                                onChange={handleChange}
                                className='infoInput'
                                placeholder='Confirm Password' />
                        }
                    </div>
                    <div>
                        {
                            isSignUp ? (<span>Already have an account? <a href='' onClick={handleSignUpLogin}><strong>Login</strong></a></span>)
                                : (<span>Don't have an account? <a href='' onClick={handleSignUpLogin}><strong>Sign Up</strong></a></span>)
                        }
                    </div>
                    <button disabled={loading} type='submit' className='button infoButton' >
                        {loading ? 'Loading...' : isSignUp ? 'SignUp' : 'Logins'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Auth