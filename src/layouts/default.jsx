import { useRouteContext } from '/dx:core.js'
import { Show, children } from 'solid-js'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Banner from '../components/Banner'

export default function Default(props) {
  const c = children(() => props.children)
  const { state } = useRouteContext()

  return (
    <>
      <Show when={state.message}>
        <Banner message={state.message} />
      </Show>

      <Header />
      {c()}
      <Footer />
    </>
  )
}
