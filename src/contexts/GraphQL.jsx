import { createContext, createMemo, useContext } from 'solid-js'
import { createClient } from '@urql/core'

const GraphQLContext = createContext()

function createGqlClient(accessToken) {
  if (!accessToken) return null
  return createClient({
    url: import.meta.env.VITE_GQL_API_URL,
    fetchOptions: () => {
      return {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    }
  })
}

export const useGraphQL = () => useContext(GraphQLContext)
export function GraphQLProvider(props) {
  const { accessToken } = props
  const gqlClient = createMemo(() => createGqlClient(accessToken()))

  return (
    <GraphQLContext.Provider value={gqlClient}>
      {props.children}
    </GraphQLContext.Provider>
  )
}
