import { useState } from "react"

export const useFetching = (callback) => {
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState('')

  const fetching = async () => {
    try {
      setisLoading(true)
      await callback()
    } catch (error) {
      setError(error.message)
    } finally {
      setisLoading(false)
    }
  }

  return [fetching, isLoading, error]
}