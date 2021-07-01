import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUp from './SignUp'
import LogIn from './LogIn'
import ResetPassword from './ResetPassword'
import Home from './Home'
import AccountSetting from './AccountSetting'
import Home1 from './Home1'
import Editor from './editor/Editor'
import Upload from './Upload'

export default function Navigation() {
	const [token, setToken] = useState('')

	const login = token => {
		setToken(token)
		localStorage.setItem('token', token);
	}

	useEffect(() => {
		const token = localStorage.getItem('token')
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
						<Route path="/editor/:id" component={Editor} />
						<Route path="/upload" component={Upload}/>
                    </Switch>
            }
        </Router>
    )
}
