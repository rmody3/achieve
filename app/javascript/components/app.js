import React, { useState } from 'react'
import axios from 'axios'

import csrfHelper from '../utils/csrfHelper' 

const App = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirmation, setPasswordConfirmation] = useState([{ text: 'Learn Hooks' }]);

    const handleSignup = (e) => {
        e.preventDefault()
    
        csrfHelper()
    
        axios.post('http://localhost:3000/teachers', {
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation
        })
    }

    return (
        <div>
            <h2>Sign Up</h2>
            <input 
                type='text'
                id='email' 
                placeholder='email'
                onChange={event => setEmail(event.target.value)}
            />
            <input 
                type='password'
                id='password' 
                placeholder='password'
                onChange={event => setPassword(event.target.value)}
            />
            <input 
                type='password'
                id='password' 
                onChange={event => setPasswordConfirmation(event.target.value)}
            />
            <button onClick={handleSignup}>Sign Up!</button>
        </div>
    )
}   

export default App