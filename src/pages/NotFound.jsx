import { FileSearch } from "@phosphor-icons/react"
import { Link } from "react-router-dom"
const NotFound = () => {
  return (
    <div className="flex items-center justify-center max-w-xl min-h-screen mx-auto">
      <div className="flex flex-col items-center justify-center gap-4">
        <FileSearch size={32} className="text-fuchsia-700" />
        <h3 className="text-3xl font-bold text-fuchsia-700">
          <span className="text-red-600">404 </span>Page Not Found
        </h3>
        <Link
          to="/"
          className="text-black underline transition-all hover:text-fuchsia-700 "
        >
          Back To Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
