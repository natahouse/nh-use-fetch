import to from './to'

const JWT_TOKEN = 'TESTE';

const getHeaders = () => {
  const jwtToken = localStorage.getItem(JWT_TOKEN)
  const Authorization = jwtToken ? `${jwtToken}` : ''

  return new Headers({
    Authorization,
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
  })
}

const resolveFetch = (res) => {
  const json = res.json()
  if (!res.ok) {
    throw json
  }
  return json
}

const getConfig = (config, payload) =>
  payload ? { ...config, ...{ body: JSON.stringify(payload) } } : config

export const request = async (
  url,
  method,
  payload,
) => {
  const config = {
    method,
    headers: getHeaders(),
    // credentials: 'same-origin',
  }

  const [results, err] = await to(
    fetch(url, getConfig(config, payload)).then(resolveFetch),
  )

  if (err) {
    throw err
  }

  return results
}

export const get = (url) => request(url, 'GET')

export const post = (url, payload) =>
  request(url, 'POST', payload)

export const put = (url, payload) =>
  request(url, 'PUT', payload)

export const destroy = (url) => request(url, 'DELETE')
