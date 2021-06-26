import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUp from './SignUp'
import LogIn from './LogIn'
import ResetPassword from './ResetPassword'
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
							<p>Home page</p>
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
							<p>User main page</p>
						</Route>
						<Route path="/settings">
							<p>Account setting page</p>
						</Route>
						<Route path="/editor/:id" component={Editor} />
						<Route path="/upload" component={Upload}/>
					</Switch>
			}
		</Router>
	)
}
