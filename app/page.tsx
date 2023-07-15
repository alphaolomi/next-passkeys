import Link from 'next/link'

// implement a HomePage with a TopNav, a div centered vertically and horizontally with a title, sub title and a button to go to the login page, and a button to go to the registration page

export default function HomePage() {
  return (
    <div>
      <TopNav />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl text-gray-800 font-bold">🔐 Next Authn App</h1>
        <h2 className="text-2xl text-gray-600 font-semibold">Next.js + 🔑 Passkey + WebAuthn = 🔥</h2>
        <div className="flex flex-row space-x-4">
          <Link href="/login">
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</a>
          </Link>
          <Link href="/register">
            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Register</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

function TopNav() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">🔐 Next Authn App</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><g><path d="M0 0h20v20H0z" fill="none" /><path d="M0 5h20v2H0zM0 11h20v2H0zM0 17h20v2H0z" /></g></svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
        </div>
        <div>
          <Link href="#" className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
            Login
          </Link>
          <Link href="#" className="block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
            Register
          </Link>
        </div>
      </div>
    </nav>
  )
}
