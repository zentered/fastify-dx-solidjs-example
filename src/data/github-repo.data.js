import { gql } from '@urql/core'
import { useGraphQL } from '../contexts/GraphQL'

export default async function repos(repoId) {
  const gqlClient = useGraphQL()
  const login = await gqlClient()
    ?.query(
      gql`
        query {
          viewer {
            login
          }
        }
      `
    )
    .toPromise()

  return gqlClient()
    ?.query(
      gql`
        query repo($name: String = "", $owner: String = "") {
          repository(name: $name, owner: $owner) {
            id
            name
            description
          }
        }
      `,
      {
        name: repoId,
        owner: login.data.viewer.login
      }
    )
    .toPromise()
}
