import { lazy, Suspense, createResource } from 'solid-js'
import { useAuth0 } from '../contexts/Auth0'
import { useRouteContext } from '/dx:core.js'
import dataGitHubRepos from '../data/github-repos.data'

export function getMeta() {
  return {
    title: 'Welcome to Fastify DX!'
  }
}

export default function Index() {
  const auth0 = useAuth0()
  const { state } = useRouteContext()

  const RepoList = lazy(() => import('../components/RepoList'))

  state.message = 'Welcome to Fastify DX for Solid!'

  const [repos] = createResource(dataGitHubRepos)

  return (
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto mb-16">
        <div class="bg-gray-50 shadow overflow-hidden sm:rounded-lg p-8">
          <div class="mt-5">
            <dl class="">
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt class="text-sm font-medium text-gray-500">Auth Info</dt>
                <dd class="mt-1 text-sm text-gray-900">
                  <div class="flex">
                    <div class="mr-4 flex-shrink-0">
                      <img
                        class="inline-block h-14 w-14 rounded-full"
                        src={auth0.user()?.picture}
                        alt={auth0.user()?.nickname}
                      />
                    </div>
                    <div>
                      {auth0.user()?.name}
                      <br />
                      <span class="text-xs font-bold">{auth0.userId()}</span>
                    </div>
                  </div>
                </dd>
              </div>
              <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                <dt class="text-sm font-medium text-gray-500">Auth token</dt>
                <dd class="mt-1 whitespace-pre-line text-xs text-gray-900">
                  <pre class="truncate">
                    <code class="">{auth0.token()}</code>
                  </pre>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <RepoList repos={repos} />
      </Suspense>
    </div>
  )
}
