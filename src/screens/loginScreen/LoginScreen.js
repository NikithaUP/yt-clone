import React, { useEffect } from 'react'
import './loginScreen.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../redux/actions/auth.action'

const LoginScreen = () => {
  const dispatch = useDispatch()

  const accessToken= useSelector(state=>state.auth.accessToken)
  
  const handleLogin = () => {
    dispatch(login())
   }
  
  const navigate=useNavigate()
  
  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  },[accessToken,navigate])
  
  return (
    <div className='login'>
      <div className='login-page'>
          <div className='login-container'>
            <div className="login-header">
              <img src="https://www.gstatic.com/youtube/img/branding/youtubelogo/svg/youtubelogo.svg" alt="YouTube Logo" />
              <h1>Sign in</h1>
            </div>
            <form className="login-form">
            <input type="text" placeholder="Email or phone" />
            <input type="password" placeholder="Password" />
            </form>

            <button onClick={handleLogin} className="login-btn">Sign in</button>
            <hr></hr>
            <button onClick={handleLogin} className="google-btn">Login With Google</button>
            <div className="login-footer">
              <div className="remember-me">
                <input type="checkbox" id="remember-me" />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <Link to="/">Forget Password?</Link>
            </div>
        
        <div className="create-account">
          <p>Don't have an account? <Link to="/">Create Account</Link></p>
        </div>
       </div>
      </div>
      </div>
  )
}

export default LoginScreen
