import 'uno.css'
import { Auth0, useAuth0 } from './contexts/Auth0'
import { createMutable } from 'solid-js/store'
import { Router, Routes, Route } from 'solid-app-router'
import DXRoute from '/dx:route.jsx'
import { isServer } from '/dx:core.js'
import { createResource, Show, For, mergeProps } from 'solid-js'
import { GraphQLProvider } from './contexts/GraphQL'
import githubAuth from './data/github-auth.data'

function Login(props) {
  return (
    <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div class="screen gap-4">
            <span class="text-5xl font-bold">Unauthorized</span>
            <p class="text-2xl font-light text-gray-500">
              You need to be logged in to access this page.
            </p>

            <div class="mt-6 space-y-6">
              <div>
                <a
                  onClick={() => props.auth0.loginWithPopup()}
                  type="button"
                  class="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  Log In
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SiteRequiresAuth(props) {
  const auth0 = useAuth0()
  const [accessToken] = createResource(() => auth0.userId(), githubAuth)

  return (
    <Show
      when={auth0.isInitialized() && auth0.isAuthenticated()}
      fallback={<Login auth0={auth0} />}
    >
      <Show when={accessToken()}>
        <GraphQLProvider accessToken={accessToken}>
          {props.children}
        </GraphQLProvider>
      </Show>
    </Show>
  )
}

export default function Root(props) {
  props = mergeProps(
    {
      state: isServer
        ? props.payload.serverRoute.state
        : createMutable(props.payload.serverRoute.state)
    },
    props
  )

  return (
    <Auth0
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    >
      <SiteRequiresAuth>
        <Router url={props.url}>
          <Routes>
            <For each={props.payload.routes}>
              {(route) => (
                <Route
                  path={route.path}
                  element={
                    <DXRoute
                      state={props.payload.serverRoute.state}
                      path={route.path}
                      payload={props.payload}
                      component={route.component}
                    />
                  }
                />
              )}
            </For>
          </Routes>
        </Router>
      </SiteRequiresAuth>
    </Auth0>
  )
}
