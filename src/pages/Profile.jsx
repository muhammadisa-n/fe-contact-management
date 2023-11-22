import { useEffect, useState } from "react"
import NavigationBar from "../components/NavigationBar"
import { getUserLoggedIn } from "../services/user-services"
import ImageProfile from "/profile.jpg"
const Profile = () => {
  const [user, setUser] = useState([])
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (!token) {
      navigate("/auth/login")
    }
  }, [token])
  useEffect(() => {
    getUserLoggedIn(token, (response) => {
      setUser(response)
    })
  }, [])

  return (
    <>
      <NavigationBar />
      <div className="flex items-center justify-center max-w-xl min-h-screen mx-auto">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={ImageProfile}
              alt="Profile User"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {user.username}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.name}
            </span>
            <div className="flex mt-4 md:mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
              >
                Edit User
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
