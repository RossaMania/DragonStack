import { useFetchAccountInfoQuery } from "../slices/usersApiSlice";
import Loader from "./Loader";

const AccountInfo = () => {
  const { data: accountInfo, error, isLoading } = useFetchAccountInfoQuery();

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>Account Info</h3>
      <div>Username: {accountInfo.info.username}</div>
      <div>Balance: {accountInfo.info.balance}</div>
    </div>
  );
};

export default AccountInfo;