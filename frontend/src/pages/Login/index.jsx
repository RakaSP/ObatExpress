import React, { useState } from 'react'
import styles from '../../styles/style'
import '../../styles/index.scss'
import { mtLogoT } from '../../assets/EmployeePage'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'

const Login = () => {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('admin')
  const [userSelect, setUserSelect] = useState(false)
  const navigate = useNavigate()
  const users = [
    { username: 'admin', password: 'admin' },
    { username: 'driver', password: 'driver' },
    { username: 'packer', password: 'packer' },
  ]
  const handleLogin = (event) => {
    event.preventDefault()
    if (username === 'admin' && password === 'admin') navigate('/admin')
    else if (username === 'driver' && password === 'driver') navigate('/driver')
    else if (username === 'packer' && password === 'packer')
      navigate('/packer/vehicle/1')
    else console.log('Invalid username or password')
  }
  return (
    <div>
      <Link to="/" className="fixed left-12 top-4 flex flex-row items-center">
        <img src={mtLogoT} className="block m-[8px] h-[50px]" alt="logo" />
        <h1 className="text-2xl font-semibold text-[#0042c7]">ObatExpress</h1>
      </Link>
      <div
        className={`${styles.fullScreen} h-[100vh] flex justify-center items-center`}
      >
        <div className="flex flex-col w-[25%]">
          <h4 className={`${styles.heading2} mb-2`}>Sign In</h4>
          <p className={`${styles.paragraph} text-[14px] mb-4`}>
            Enter your account details below
          </p>
          <form className="flex flex-col" onSubmit={handleLogin}>
            {/* <input
              type="text"
              placeholder="Email Address"
              className={`my-4 ${styles.inputForm} `}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={`my-4  ${styles.inputForm}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> */}
            <div
              onClick={() => setUserSelect(!userSelect)}
              className={`${
                userSelect ? 'text-[#112D4E]' : 'text-[#A4ABBD]'
              } w-full text-xl relative`}
            >
              <div className="flex items-center relative px-2 py-2 rounded-md border-2">
                {username}
                <FontAwesomeIcon
                  icon={userSelect === true ? faAngleDown : faAngleRight}
                  className="absolute right-4 text-[#112D4E]"
                />
              </div>
              <div
                className={`${
                  userSelect ? 'block' : 'hidden'
                } rounded-md px-2 py-1 absolute w-full mt-2 border-2 bg-[#f7fbfc] z-10`}
              >
                {users.map((user, index) => (
                  <div
                    className={`${
                      index !== users.length ? 'mb-1' : 'mb-0'
                    } px-2 py-1 rounded-md hover:bg-[#D2DAE1]`}
                    onClick={() => {
                      setUsername(user.username)
                      setPassword(user.password)
                    }}
                  >
                    {user.username}
                  </div>
                ))}
              </div>
            </div>
            <div className=" w-full text-xl relative mt-2 text-[#A4ABBD]">
              <div className="flex items-center relative px-2 py-2 rounded-md border-2">
                *******
              </div>
            </div>
            <p
              className={`${styles.paragraph} text-right text-[14px] mt-3 !text-[#0b6efe] cursor-pointer `}
            >
              Forgot your password?
            </p>
            <button id="loginBtn" type="submit" styles="mt-5 my-button">
              Submit
            </button>
          </form>

          <span className="flex justify-center mt-4">
            <p className={`${styles.paragraph} text-right text-[14px] mr-2 `}>
              Not registered yet?
            </p>
            <p
              className={`${styles.paragraph} text-right text-[14px] !text-[#0b6efe] cursor-pointer`}
            >
              Create an account
            </p>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
