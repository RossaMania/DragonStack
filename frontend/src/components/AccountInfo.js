import { useFetchAccountInfoQuery } from "../slices/usersApiSlice";
import Loader from "./Loader";

const AccountInfo = () => {
  const { data: accountInfo, error, isLoading } = useFetchAccountInfoQuery();

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h3>Account Info</h3>
      <h4>Username: {accountInfo.info.username}</h4>
      <h4>Balance: {accountInfo.info.balance}</h4>
    </div>
  );
};

export default AccountInfo;