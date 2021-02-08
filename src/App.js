import React, { useEffect, useState } from 'react'
import './App.css'
import BrowseScreen from './BrowseScreen'
import { Route, Redirect } from 'react-router-dom'
import HomeScreen from './HomeScreen'
import { auth } from './firebase'
import UserContext from './UserContext'
import ProfileScreen from './ProfileScreen'

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if(userAuth) {
        setUser(userAuth)
      }
    })

    return unsubscribe
  }, [])

  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className="app">
        <Route path='/' exact>
          {user ? <Redirect to="/browse" /> : <HomeScreen />}
        </Route>
        <Route path='/browse' exact>
          {user ? <BrowseScreen /> : <Redirect to="/" />}
        </Route>
        <Route path='/profile' exact>
        {user ? <ProfileScreen /> : <Redirect to="/" />}
        </Route>
      </div>
    </UserContext.Provider>
  );
}

export default App
