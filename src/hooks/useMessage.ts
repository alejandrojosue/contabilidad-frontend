import {useState} from 'react'

import {errorMessageResponse} from '@type/types'
import {fetchDataFromAPI} from '@util/fetchDataFromAPI'

export const useMessage = () => {
  const [data, setData] = useState<errorMessageResponse>(
      {values: [], loading: true, error: undefined, count: 0, limit: 25})

  const get =
      async () => {
    try {
      const res = await fetchDataFromAPI({url: '/error-messages?limit=100'})
      console.log('res', {res})
      setData(prev => ({...prev, values: res.values, error: res.error}))
    } catch (error) {
      setData(prev =>({...prev, error: {msg: (error as Error).message, details: []}}))
    } finally {
      setData(prev => ({...prev, loading: false}))
    }
  }

  return {
    get, ...data
  }
}
