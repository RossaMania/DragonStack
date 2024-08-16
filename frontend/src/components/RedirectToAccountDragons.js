import { Navigate } from "react-router-dom";

const RedirectToAccountDragons = () => {
  return (
    <div>
      <Navigate to="/account-dragons" replace={true} />
    </div>
  )
}

export default RedirectToAccountDragons