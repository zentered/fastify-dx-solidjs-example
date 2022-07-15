import { gql } from '@urql/core'
import { useGraphQL } from '../contexts/GraphQL'

export default async function repos() {
  const gqlClient = useGraphQL()
  return gqlClient()
    ?.query(
      gql`
        query ($number_of_repos: Int!) {
          viewer {
            name
            repositories(
              orderBy: { field: STARGAZERS, direction: DESC }
              first: $number_of_repos
            ) {
              nodes {
                name
                stargazerCount
              }
            }
            login
          }
        }
      `,
      {
        number_of_repos: 10
      }
    )
    .toPromise()
}
