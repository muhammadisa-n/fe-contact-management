import React from "react"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import axios from "axios"
const NavigationBar = () => {
  const navigate = useNavigate()
  const handleLogout = async () => {
    const token = localStorage.getItem("token")
    try {
      await axios
        .delete(`${import.meta.env.VITE_BASE_API_URL}/users/logout`, {
          headers: { Authorization: token },
        })
        .then((response) => {
          localStorage.removeItem("token")
          navigate("/auth")
        })
    } catch (e) {
      console.log(e.response.data.errors)
    }
  }
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Contact Management
            </span>
          </a>
          <div className="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col p-4 mt-4 font-medium border border-gray-100 rounded-lg md:p-0 bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className="block px-3 py-2 text-gray-900 rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className="block px-3 py-2 text-gray-900 rounded md:p-0 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavigationBar
