import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { auth, db } from './firebase'
import Nav from './Nav'
import './ProfileScreen.css'
import UserContext from './UserContext'

const ProfileScreen = () => {

    const {user, setUser} = useContext(UserContext)
    const history = useHistory()
    const [plan, setPlan] = useState(null)

    useEffect(()=> {
        db.collection("users").doc(user.email).get()
        .then((doc) => {
            setPlan(doc.data().plan)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const updatePlan = (newPlan) => {
        setPlan(newPlan)
        db.collection("users").doc(user.email).update({
            plan: newPlan
        }).then(() => {
            console.log("Document successfully updated!")
        }).catch((err) => {
            console.error(err)
        })
    }

    const signout = () => {
        auth.signOut()
        setUser(null)
        history.push('/')
    }

    return (
        <div className='profileScreen'>
            <Nav />
            <div className='profileScreen_body'>
                <h1>Edit Profile</h1>
                <div className='profileScreen_info'>
                    <img src='https://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png' alt='' />
                    <div className='profileScreen_details'>
                        <h2>{user.email}</h2>
                        <div className='profileScreen_plans'>
                            <h3>Plans</h3>
                            <p>Renewal Date: </p>
                            <div className='profileScreen_plan'>
                                <div className='profileScreen_planInfo'>
                                    <h5>Mobile 199</h5>
                                    <p>Watch on 1 mobile phone or tablet at a time in Standard Definition. Download videos on 1 phone or tablet.</p>
                                </div>
                                {plan==="Mobile" ? <button className="profileScreen_disabled" disabled>Subscribed</button> : <button onClick={() => updatePlan("Mobile")}>₹199/month</button>}
                            </div>
                            <div className='profileScreen_plan'>
                                <div className='profileScreen_planInfo'>
                                    <h5>Basic 499</h5>
                                    <p>Watch on 1 screen at a time in Standard Definition. Download videos on 1 phone or tablet.</p>
                                </div>
                                {plan==="Basic" ? <button className="profileScreen_disabled" disabled>Subscribed</button> : <button onClick={() => updatePlan("Basic")}>₹499/month</button>}
                            </div>
                            <div className='profileScreen_plan'>
                                <div className='profileScreen_planInfo'>
                                    <h5>Standard 649</h5>
                                    <p>Watch on 2 screens at a time. Full HD (1080p) available. Download videos on 2 phones or tablets.</p>
                                </div>
                                {plan==="Standard" ? <button className="profileScreen_disabled" disabled>Subscribed</button> : <button onClick={() => updatePlan("Standard")}>₹649/month</button>}
                            </div>
                            <div className='profileScreen_plan'>
                                <div className='profileScreen_planInfo'>
                                    <h5>Premium 799</h5>
                                    <p>Watch on 4 screens at a time. Full HD (1080p) and Ultra HD (4K) available. Download videos on 4 phones or tablets.</p>
                                </div>
                                {plan==="Premium" ? <button className="profileScreen_disabled" disabled>Subscribed</button> : <button onClick={() => updatePlan("Premium")}>₹799/month</button>}
                            </div>
                        </div>
                        <button onClick={signout} className='profileScreen_signout'>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen