import { useFetchAccountInfoQuery } from "../slices/usersApiSlice"

const AccountInfo = () => {
  const { data: accountInfo, error, isLoading } = useFetchAccountInfoQuery()

  return (
    <div>
    <h3>Account Info</h3>
    <div>Username: {accountInfo.username}</div>
    <div>Balance: {accountInfo.balance}</div>
    </div>
  )
}

export default AccountInfo