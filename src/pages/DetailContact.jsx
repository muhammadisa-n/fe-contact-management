import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import NavigationBar from "../components/NavigationBar"
import ImageProfile from "/profile.jpg"
const DetailContact = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const token = localStorage.getItem("token")
  const [contact, setContact] = useState([])
  const [addresses, setAddresses] = useState([{}])

  useEffect(() => {
    if (!token) {
      navigate("/auth/login")
    }
  }, [token])
  const getContactById = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_BASE_API_URL}/contacts/${id}`,
      { headers: { Authorization: token } }
    )
    setContact(response.data.data)
    setAddresses(response.data.data.addresses)
  }
  useEffect(() => {
    getContactById()
  }, [id])

  return (
    <>
      <NavigationBar />
      <div className="flex items-center justify-center max-w-xl min-h-screen mx-auto">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center pb-10">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={ImageProfile}
              title="Contact Image"
              alt="Contact Image"
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {contact.first_name} {contact.last_name}
            </h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {contact.email}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {contact.phone}
            </span>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              Address
            </h5>
            {addresses.map((address, index) => (
              <div
                key={address.id}
                className="flex flex-wrap w-full text-center "
              >
                <div className="w-full px-4">
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    Street: {address.street}
                  </h5>
                </div>
                <div className="w-full px-4">
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    City: {address.city}
                  </h5>
                </div>
                <div className="w-full px-4">
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    Province: {address.province}
                  </h5>
                </div>
                <div className="w-full px-4">
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    Country: {address.country}
                  </h5>
                </div>
                <div className="w-full px-4">
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    Postal Code: {address.postal_code}
                  </h5>
                </div>
              </div>
            ))}

            <div className="flex mt-4 md:mt-6 ">
              <Link
                to={"/"}
                className="inline-flex items-center px-4 py-2 mx-3 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
              >
                Back
              </Link>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit Contact
              </a>
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700 ms-3"
              >
                Add Address
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailContact
