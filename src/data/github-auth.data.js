import ky from 'ky-universal'

export default async function getToken(userId) {
  const $fetch = ky.extend({
    prefixUrl: 'http://localhost:8080'
  })

  try {
    const res = await $fetch.post('api/token', {
      json: { userId }
    })
    const { token } = await res.json()
    return token
  } catch (err) {
    console.error(err)
  }
}
