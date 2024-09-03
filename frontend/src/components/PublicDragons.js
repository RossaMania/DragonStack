import { NavLink } from "react-router-dom"
import { useFetchPublicDragonsQuery } from "../slices/dragonApiSlice"

import Loader from "./Loader"
import PublicDragonRow from "./PublicDragonRow"

const PublicDragons = () => {

  // @TODO Research NavLink in Bootstrap.

  const { data: publicDragons, isLoading } = useFetchPublicDragonsQuery()

  return (
    <div>
    <h3>Public Dragons</h3>
    <NavLink to="/">Home</NavLink>
    {isLoading ? (
      <Loader />
    ) : (
      <div>
      {publicDragons.dragons.map((dragon) => {
        return (
          <div key={dragon.dragonId}>
          <PublicDragonRow dragon={dragon} />
          <hr />
          </div>
      )
      })}
    </div>
  )
}
</div>
)
}

export default PublicDragons