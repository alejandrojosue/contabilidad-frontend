import { useState } from "react"
import { fetchDataFromAPI } from "../util/fetchDataFromAPI"

export const useAudit = () => {
 const [data, setData] = useState({ values: [], loading: true, error: null })

 const get = async () => {
  try {
   const res = await fetchDataFromAPI({ url: "/auditing" })
   setData(prev => ({ ...prev, values: res?.values || [] }))
  } catch (error) {
   setData(prev => ({ ...prev, error }))
  } finally {
   setData(prev => ({ ...prev, loading: false }))
  }
 }

 return { get, ...data }
}
