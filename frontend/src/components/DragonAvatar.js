import React from "react";

const DragonAvatar = ({ dragon }) => {

   return (
     <div>
       <span>Generation:{dragon.generationId}.</span>
       <span>ID:{dragon.dragonId}.</span>

       {dragon.traits.map((trait) => trait.traitValue).join(", ")}
     </div>
   );
};

export default DragonAvatar;