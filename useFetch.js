import { useState, useEffect } from 'react'
import to from './to'
import * as request from './request'

export const method = {
  POST: 'post',
  GET: 'get',
  PUT: 'put',
  DELETE: 'destroy',
}

export default ({
    method, payload = undefined, url,
    condition = () => true,
    callback = () => true
  }) => {
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isUpdated, setUpdated] = useState(false)

  const didUnmount = () => {
    return
  }

  const didUpdate = () => {
    const fetchData = async () => {
      setIsError(false)

      const [data, err] = await to(request[method](url, payload))

      if (err) {
        setIsError(true)
      }
      setData(data)
      setIsLoading(false)
      callback(data)
    }

    if (condition()) {
      fetchData()
    }
    return didUnmount
  }

  const doUpdate = args => {
    setUpdated(!isUpdated)
    return args
  }

  useEffect(didUpdate, [isUpdated])

  return [data, isLoading, isError, doUpdate]
}
