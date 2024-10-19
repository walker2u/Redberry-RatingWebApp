import React from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import app from "../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInFailure, signInSuccess, signInStart } from '../redux/user/user.slice.js'

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { error, loading } = useSelector(state => state.user);
    const handleGoogleClick = async () => {
        try {
            dispatch(signInStart());
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: result.user.email,
                    username: result.user.displayName,
                    image: result.user.photoURL
                })
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(signInFailure(data.message));
                return;
            }
            if (data) {
                dispatch(signInSuccess(data));
                navigate('/');
            }

        } catch (error) {
            console.log("could not Login with google", error)
        }
    }


    return (
        <div className="h-full flex items-center justify-center bg-red-100">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 sm:p-8">
                <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800">Aao Bsdk</h2>

                <div className="mt-6">
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <button
                        onClick={handleGoogleClick}
                        className="w-full bg-red-500 text-white py-3 rounded-lg flex items-center justify-center space-x-2 hover:bg-red-600 transition"
                    >
                        <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" viewBox="0 0 24 24">
                            <GoogleIcon />
                        </svg>
                        <span className="text-md sm:text-md">Sign In with Google</span>
                    </button>
                </div>
                <p className="text-center text-sm text-gray-500 mt-4">
                    Ek hi option hai..
                </p>
            </div>
        </div>

    );
};

export default SignIn;
