import ky from 'ky-universal'

export default (ctx) => {
  if (ctx.server) {
    ctx.state.userData = ctx.server.userData
  }
}

export const $fetch = ky.extend({
  prefixUrl: 'http://localhost:8080'
})

export const state = () => ({
  message: null,
  userData: {
    userId: null,
    nickname: null,
    accessToken: null
  }
})

export const actions = {}
