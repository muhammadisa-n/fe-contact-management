import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import NavigationBar from "../components/NavigationBar"
import axios from "axios"

const Home = () => {
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (!token) {
      navigate("/auth/login")
    }
  }, [token])
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_API_URL}/contacts`, {
        headers: { Authorization: token },
      })
      .then((response) => {
        setContacts(response.data.data)
      })
  }, [contacts])

  return (
    <>
      <NavigationBar />
      <section className="pt-10 pb-32 dark:bg-dark bg-slate-50">
        <div className="container">
          <div className="w-full px-4">
            <div className="max-w-xl mx-auto mb-16 text-center">
              <h4 className="mb-2 text-lg font-semibold uppercase text-primary">
                Contact App
              </h4>
              <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl lg:text-5xl dark:text-white">
                Contact List
              </h2>
            </div>
          </div>
          <div className="flex flex-wrap items-center">
            {contacts.map((contact) => (
              <div className="w-full px-4 lg:w-1/2 xl:w-1/3" key={contact.id}>
                <div className="mb-10 overflow-hidden bg-white rounded-md shadow-md dark:bg-slate-800">
                  <div className="px-6 py-8">
                    <p className="mb-4 text-base font-medium text-secondary">
                      Fullname :{contact.first_name} {contact.last_name}
                    </p>
                    <p className="mb-4 text-base font-medium text-secondary">
                      Email : {contact.email}
                    </p>
                    <p className="mb-4 text-base font-medium text-secondary">
                      Phone : {contact.phone}
                    </p>
                    <Link
                      to={`/detail/${contact.id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Details
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
