import { Link } from "react-router-dom"

const AuthLayout = (props) => {
  const { title, children, text, linkTitle, linkto, handleSubmit } = props
  return (
    <>
      <div className="p-6 space-y-2 md:space-y-2 sm:p-4">
        <h1 className="text-3xl font-bold text-fuchsia-700">{title}</h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          {children}
          <p className="text-sm font-light text-black dark:text-gray-400">
            {text}
            <Link
              to={linkto}
              className="font-medium text-black hover:underline dark:text-primary-500"
            >
              {linkTitle}
            </Link>
          </p>
        </form>
      </div>
    </>
  )
}

export default AuthLayout
