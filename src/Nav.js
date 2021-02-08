import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Nav.css'

const Nav = () => {

    const [showNav, handleShowNav] = useState(false)

    const transitionNavbar = () => {
        if(window.scrollY > 100) {
            handleShowNav(true)
        }
        else {
            handleShowNav(false)
        }
    }

    //runs once when component is mounted
    useEffect(() => {
        window.addEventListener('scroll', transitionNavbar) //attach an EventListener which runs transitionNavbar every time user scrolls
        return () => window.removeEventListener('scroll', transitionNavbar) //return function is run when component unmounts, cleaning up the EventListener
    }, [])

    return (
        <div className={`nav ${showNav && 'nav_black'}`}>
            <div className='nav_contents'>
                <Link to='/'><img className='nav_logo' src='https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png' alt='' /></Link>
                <Link to='/profile'><img className='nav_avatar' src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png' alt='' /></Link>
            </div>
        </div>
    )
}

export default Nav