import { NavLink } from "react-router-dom"
import { useFetchPublicDragonsQuery } from "../slices/dragonApiSlice"

const PublicDragons = () => {

  // @TODO Research NavLink in Bootstrap.

  const { data: publicDragons, isLoading } = useFetchPublicDragonsQuery()
  return (
    <div>
    <h3>Public Dragons</h3>
    {isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
        {publicDragons.map((dragon) => (
          <div key={dragon.dragonId}>
            <span>{dragon.nickname}</span>{" "}
            <span>{dragon.traits.map((trait) => trait.traitValue).join(", ")}</span>
          </div>
        ))}
    <NavLink to="/">Home</NavLink>
    </div>
  )
}
</div>
)
}

export default PublicDragons