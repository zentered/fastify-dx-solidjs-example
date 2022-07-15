// https://github.com/rturnq/solid-auth0/blob/master/src/components.tsx
import createAuth0Client from '@auth0/auth0-spa-js'
import {
  createContext,
  useContext,
  createResource,
  createSignal
} from 'solid-js'
import { isServer } from 'solid-js/web'

const Auth0Context = createContext()
export const useAuth0 = () => useContext(Auth0Context)

export function Auth0(props) {
  const [user, setUser] = createSignal()
  const [token, setToken] = createSignal()
  const [userId, setUserId] = createSignal()

  const [isAuthenticated, setIsAuthenticated] = createSignal()

  let auth0Client
  if (!isServer) {
    const auth0ClientPromise = createAuth0Client({
      domain: props.domain,
      client_id: props.clientId,
      redirect_uri: props.successRedirectUri
    })
    const [client] = createResource(async () => {
      return auth0ClientPromise
    })
    auth0Client = client
  }

  return (
    <Auth0Context.Provider
      value={{
        auth0Client,
        isInitialized: () => isAuthenticated() !== undefined,
        isAuthenticated: () => !!isAuthenticated(),
        user,
        userId,
        token,
        async loginWithPopup() {
          await auth0Client().loginWithPopup()

          if (setIsAuthenticated(await auth0Client().isAuthenticated())) {
            const user = await auth0Client().getUser()
            const token = await auth0Client().getTokenSilently()
            setUser(user)
            setUserId(user.sub)
            setToken(token)
          }
        },
        async logout(props) {
          auth0Client().logout({
            returnTo: import.meta.env.VITE_BASE_URL,
            ...props
          })
        }
      }}
    >
      {props.children}
    </Auth0Context.Provider>
  )
}
