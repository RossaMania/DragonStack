import { useEffect } from "react"
import { useFetchAccountInfoQuery } from "../slices/usersApiSlice"
import Loader from "./Loader"

const AccountInfo = () => {
  const { data: accountInfo, error, isLoading } = useFetchAccountInfoQuery()

  if (isLoading) return <Loader />

  if (error) return <div>Error: {error.message}</div>

  useEffect(() => {
    fetchAccountInfo()
  }, []) // Empty array means this effect runs only once

  return (
    <div>
    <h3>Account Info</h3>
    <div>Username: {accountInfo.username}</div>
    <div>Balance: {accountInfo.balance}</div>
    </div>
  )
}

export default AccountInfo