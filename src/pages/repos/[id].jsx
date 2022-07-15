import { createResource } from 'solid-js'
import dataGitHubRepo from '../../data/github-repo.data'
import { Link, useParams } from 'solid-app-router'

export const serverOnly = true

export function getMeta() {
  return {
    title: 'Server Only Page'
  }
}

export default function Repos() {
  const params = useParams()

  const [repos] = createResource(params.id, dataGitHubRepo)
  return (
    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div class="text-center">
          <h1 class="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            {repos()?.data.repository.name}
          </h1>
          <p class="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            {repos()?.data.repository.description}
          </p>
        </div>
      </div>
      <Link
        href={'/'}
        class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
      >
        Back
      </Link>
    </div>
  )
}
