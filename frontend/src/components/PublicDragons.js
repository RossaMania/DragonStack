import { NavLink } from "react-router-dom"
import { useFetchPublicDragonsQuery, useFetchAccountDragonsQuery } from "../slices/dragonApiSlice"

import Loader from "./Loader"
import PublicDragonRow from "./PublicDragonRow"

const PublicDragons = () => {

  // @TODO Research NavLink in Bootstrap.

  const { data: publicDragons, isLoading } = useFetchPublicDragonsQuery();
  const { data: accountDragons, isLoading: isLoadingAccountDragons } = useFetchAccountDragonsQuery();

  console.log("Account Dragons Data:", accountDragons);

    if (isLoading || isLoadingAccountDragons) {
    return <Loader />;
  }

  return (
    <div>
      <h3>Public Dragons</h3>
      <NavLink to="/">Home</NavLink>
      <div>
        {publicDragons.dragons.map((dragon) => (
          <div key={dragon.dragonId}>
            <PublicDragonRow dragon={dragon} accountDragons={accountDragons} />
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PublicDragons