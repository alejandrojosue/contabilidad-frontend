import {useState} from 'react'

import {auditingResponse} from '@type/types'
import {fetchDataFromAPI} from '@util/fetchDataFromAPI'

export const useAudit = () => {
  const [data, setData] = useState<auditingResponse>(
      {values: [], loading: true, error: undefined, count: 0, limit: 25})

  const get =
      async () => {
    try {
      const res = await fetchDataFromAPI({url: '/auditing?limit=100'}) as auditingResponse
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
