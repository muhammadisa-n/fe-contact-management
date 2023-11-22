import { useState } from "react"
import AuthLayout from "../Layouts/AuthLayouts"
import Input from "../components/Input"
import Swal from "sweetalert2"
import { authRegister } from "../services/user-services"
import { useNavigate } from "react-router-dom"
const Register = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()
    const data = {
      username,
      name,
      password,
    }
    authRegister(data, (status, response) => {
      if (status) {
        Swal.fire({
          title: "Success",
          text: `${response}`,
          icon: "success",
          confirmButtonText: "OK",
        }).then(function () {
          navigate("/auth/login")
        })
      } else {
        Swal.fire({
          title: "Error",
          text: `${response}`,
          icon: "error",
          confirmButtonText: "OK",
        })
      }
    })
  }

  return (
    <>
      <div className="flex items-center justify-center max-w-xl min-h-screen mx-auto">
        <AuthLayout
          title="Register Page"
          btnTitle="Register"
          text="Already Have Account?"
          linkTitle="Login  Now"
          linkto="/auth/login"
          handleSubmit={handleRegister}
        >
          <Input
            title="Username"
            placeholder="username..."
            handleInput={setUsername}
          />
          <Input title="Name" placeholder="name..." handleInput={setName} />
          <Input
            title="Password"
            placeholder="*****"
            typeInput="password"
            handleInput={setPassword}
          />
          <button
            type="submit"
            className="w-full text-white bg-fuchsia-700 hover:bg-fuchsia-500 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-fuchsia-900 dark:hover:bg-fuchsia-700 dark:focus:ring-fuchsia-800"
          >
            Register
          </button>
        </AuthLayout>
      </div>
    </>
  )
}

export default Register
