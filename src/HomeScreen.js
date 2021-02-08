import React, { useState } from 'react'
import './HomeScreen.css'
import AuthModal from './AuthModal'
import { withRouter } from 'react-router'

const HomeScreen = () => {

    const [login, setLogin] = useState(false)
    const [signup, setSignup] = useState(false)
    const [email, setEmail] = useState('')

    const emailChangeHandler = (event) => {
        setEmail(event.target.value)
    }

    return (
        <div className='homeScreen'>
            <div className='homeScreen_background'>
                <img className='homeScreen_logo' src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' alt='' />
                {!login && !signup && <button className='homeScreen_button' onClick={() => setLogin(true)}>Sign In</button>}
                <div className='homeScreen_gradient'></div>
            </div>
            <div className='homeScreen_body'>
                {!login && !signup &&
                <>
                    <h1>Unlimited movies, TV shows and more.</h1>
                    <h2>Watch anywhere. Cancel anytime.</h2>
                    <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                    <div className='homeScreen_input'>
                        <form onSubmit={() => setSignup(true)}>
                            <input onChange={emailChangeHandler} type='email' placeholder='Email address' />
                            <button type='submit' className='homeScreen_input_button'>GET STARTED</button>
                        </form>
                    </div>
                    </>
                }
                {!login && signup &&
                    <AuthModal mode='signup' email={email} />
                }
                {login && !signup &&
                    <AuthModal mode='login' email={email} />
                }
            </div>
        </div>
    )
}

export default withRouter(HomeScreen)