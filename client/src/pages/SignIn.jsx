import React from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import app from "../firebase";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate();
    const handleGoogleClick = () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            signInWithPopup(auth, provider)
                .then((result) => {
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    // console.log(user.displayName);
                    navigate("/", { state: { user: user.displayName } });
                    // ...
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                });

        } catch (error) {
            console.log("could not Login with google", error)
        }
    }
    return (
        <div className="h-full flex items-center justify-center bg-red-100">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 sm:p-8">
                <h2 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800">Aao Bsdk</h2>

                <div className="mt-6">
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
