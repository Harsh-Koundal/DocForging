import React from 'react'

const Login = () => {

    const handleLogin = (e) => {
        e.preventDefault();

    }
    return (
        <div>
            <h1>Login</h1>

            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
                <button type="submit"
                    onClick={()=>handleLogin()}>Login</button>
            </form>
        </div>
    )
}

export default Login
