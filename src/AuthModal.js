import React, { useRef, useState } from 'react'
import './AuthModal.css'
import { auth, db } from './firebase'

const AuthModal = (props) => {
    const [mode, setMode] = useState(props.mode)

    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const signup = (event) => {
        event.preventDefault() //to stop the page from refreshing when form is submitted
        auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        .then(res => {
            console.log(res)
            db.collection("users").doc(res.user.email).set({
                plan: "Basic"
            })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id)
            })
            .catch((err) => {
                console.error(err)
            })
        })
        .catch(err => {
            alert(err.message)
        })
    }

    const login = (event) => {
        event.preventDefault() //to stop the page from refreshing when form is submitted
        auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            alert(err.message)
        })
    }

    return (
        <div className='authModal'>
            <form>
                {mode==='signup' && <h1>Sign Up</h1>}
                {mode==='login' && <h1>Sign In</h1>}
                <input ref={emailRef} type='email' placeholder='Email Address' defaultValue={props.email} />
                <input ref={passwordRef} type='password' placeholder='Password' />
                {mode==='signup' && <button onClick={signup} type='submit'>Sign Up</button>}
                {mode==='login' && <button onClick={login} type='submit'>Sign In</button>}
                {mode==='login' && <h4><span className='authModal_grey'>New to Netflix?</span> <span className='authModal_link' onClick={() => setMode('signup')}>Sign up now.</span></h4>}
                {mode==='signup' && <h4><span className='authModal_grey'>Already on Netflix?</span> <span className='authModal_link' onClick={() => setMode('login')}>Sign in now.</span></h4>}
            </form>
        </div>
    )
}

export default AuthModal