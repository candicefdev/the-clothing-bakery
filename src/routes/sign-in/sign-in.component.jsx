

import {
    // auth,
    signInWithGooglePopup,
    // signInWithGoogleRedirect, 
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
   
    //An asynchronous function,becayse whenever you make a call to some database,
    // it's gging to be asynchronous.
    const logGoogleUser = async () => {
        //get the value by awaiting calling our sign-in with google popup
        const {user} = await signInWithGooglePopup();
        //then just console.log the response
       const userDocRef = await createUserDocumentFromAuth(user)
    };


    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;