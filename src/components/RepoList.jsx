import { For } from 'solid-js'
import { Icon } from 'solid-heroicons'
import { star } from 'solid-heroicons/solid'
import { Link } from 'solid-app-router'

export default function RepoList(props) {
  return (
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <h2>Public GitHub Repositories</h2>
      <ul role="list" class="divide-y divide-gray-200">
        <For each={props.repos()?.data.viewer.repositories.nodes}>
          {(repo) => {
            return (
              <li>
                <Link href={`/repos/${repo.name}`}>
                  <div class="px-4 py-4 flex items-center sm:px-6">
                    <div class="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                      <div class="truncate">
                        <div class="flex text-sm">
                          <p class="font-medium text-cyan-600 truncate">
                            {repo.name}
                          </p>
                        </div>
                      </div>
                      <div class="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                        <div class="flex overflow-hidden -space-x-1">
                          <span class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                            {repo.stargazerCount}{' '}
                            <Icon path={star} class="h-6 w-6" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            )
          }}
        </For>
      </ul>
    </div>
  )
}
