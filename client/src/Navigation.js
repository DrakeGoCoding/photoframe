import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUp from './SignUp'
import LogIn from './LogIn'
import ResetPassword from './ResetPassword'
import Home from './Home'
import AccountSetting from './AccountSetting'
import Home1 from './Home1'

export default function Navigation() {
    const [token, setToken] = useState('')

    const login = token => {
        setToken(token)
        localStorage.setItem('accessToken', token)
    }

    useEffect(() => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            try {
                setToken(token)
            } catch (error) {
                setToken('')
            }
        }
    }, [token])

    return (
        <Router>
            {
                !token
                    ?
                    <Switch>
                        <Route exact path="/">
                            <Home1 />
                        </Route>
                        <Route path="/login">
                            <LogIn setToken={login} />
                        </Route>
                        <Route path="/resetpassword" component={ResetPassword} />
                        <Route path="/signup" component={SignUp} />
                    </Switch>
                    :
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/settings"> 
                            <AccountSetting />
                        </Route>
                        <Route>
                            <p>Editor page</p>
                        </Route>
                    </Switch>
            }
        </Router>
    )
}