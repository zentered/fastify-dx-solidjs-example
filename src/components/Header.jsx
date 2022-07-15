import { useAuth0 } from '../contexts/Auth0'

export default function Header() {
  const auth0 = useAuth0()

  return (
    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            Public Repo Browser
          </h1>
          <button onClick={() => auth0.logout()}>Logout</button>
        </div>
      </div>
    </div>
  )
}
