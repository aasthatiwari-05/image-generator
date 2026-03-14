import React, { useContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import Navbar from './components/Navbar'
import { AppContext } from './context/AppContext'
import { assets } from './assets/assets'
const App = () => {
  const { showLogin, setShowLogin, saveUserData } = useContext(AppContext)
  const [isSignUp, setIsSignUp] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isSignUp) {
      if (!name || !email || !password) {
        alert('Please fill all fields')
        return
      }
      const userData = {
        name,
        email,
        credits: 50
      }
      const accounts = JSON.parse(localStorage.getItem('imagifyAccounts') || '[]')
      const existingAccount = accounts.find(acc => acc.email === email)
      if (existingAccount) {
        alert('Email already exists. Please login.')
        setIsSignUp(false)
        return
      }
      accounts.push({ ...userData, password })
      localStorage.setItem('imagifyAccounts', JSON.stringify(accounts))
      saveUserData(userData)
      setShowLogin(false)
      setName('')
      setEmail('')
      setPassword('')
    } else {
      // Login
      if (!email || !password) {
        alert('Please fill all fields')
        return
      }
      const accounts = JSON.parse(localStorage.getItem('imagifyAccounts') || '[]')
      const account = accounts.find(acc => acc.email === email && acc.password === password)
      if (account) {
        const userData = {
          name: account.name,
          email: account.email,
          credits: account.credits || 50
        }
        saveUserData(userData)
        setShowLogin(false)
        setEmail('')
        setPassword('')
      } else {
        alert('Invalid email or password')
      }
    }
  }
  const handleModalToggle = (signUp) => {
    setIsSignUp(signUp)
    if (!signUp && email) {
    } else {
      setName('')
      setEmail('')
      setPassword('')
    }
  }
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/result' element={<Result/>}/>
        <Route path='/buy' element={<BuyCredit/>}/>
      </Routes>
      {/* Login/Signup Modal */}
      {showLogin && (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
          <form onSubmit={handleSubmit} className='relative bg-white p-10 rounded-xl text-slate-500 w-96'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>
              {isSignUp ? 'Create Account' : 'Login'}
            </h1>
            <p className='text-sm text-center mb-5'>
              {isSignUp ? 'Sign up to start generating images' : 'Welcome back! Please sign in to continue'}
            </p>
            {isSignUp && (
              <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img width={20} src={assets.profile_icon} alt="" />
                <input
                  className='outline-none text-sm flex-1'
                  type="text"
                  placeholder='Full Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
              <img width={20} src={assets.email_icon} alt="" />
              <input
                className='outline-none text-sm flex-1'
                type="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
              <img width={20} src={assets.lock_icon} alt="" />
              <input
                className='outline-none text-sm flex-1'
                type="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {!isSignUp && (
              <p className='text-sm text-blue-600 my-4 cursor-pointer'>Forgot password?</p>
            )}
            <button
              type='submit'
              className='bg-blue-600 w-full text-white py-2 rounded-full mt-4 hover:bg-blue-700 transition-all'>
              {isSignUp ? 'Create Account' : 'Login'}
            </button>
            <p className='mt-5 text-center'>
              {isSignUp ? (
                <>
                  Already have an account?{' '}
                  <span onClick={() => handleModalToggle(false)} className='text-blue-600 cursor-pointer font-medium'>
                    Login
                  </span>
                </>
              ) : (
                <>
                  Don't have an account?{' '}
                  <span onClick={() => handleModalToggle(true)} className='text-blue-600 cursor-pointer font-medium'>
                    Sign up
                  </span>
                </>
              )}
            </p>
            <img
              onClick={() => {
                setShowLogin(false)
                setName('')
                setEmail('')
                setPassword('')
              }}
              src={assets.cross_icon}
              className='absolute top-5 right-5 cursor-pointer'
              alt=""
            />
          </form>
        </div>
      )}
    </div>
  )
}
export default App