import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import NavigationBar from "../components/NavigationBar"

const Home = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  useEffect(() => {
    if (!token) {
      navigate("/auth")
    }
  }, [token])

  return (
    <>
      <NavigationBar />
      <div className="items-center justify-center max-w-xl mx-auto mt-10">
        <h1 className="text-4xl font-bold">Contact List</h1>
      </div>
      <div className="flex items-center justify-center max-w-xl mx-auto mt-10">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  FirstName
                </th>
                <th scope="col" className="px-6 py-3">
                  Lastname
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4">Black</td>
                <td className="px-6 py-4">Accessories</td>
                <td className="px-6 py-4">$99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Home
