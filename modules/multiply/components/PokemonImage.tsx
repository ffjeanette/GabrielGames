/* eslint-disable @next/next/no-img-element */
import Image from "next/image"
//import Image from '@mui/material/ImageList'

type Props = {
    pokeId: string
}

const PokemonImage = ({ pokeId} : Props) => {
    return (
        <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`}
            //srcSet={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeId}.png`}
            alt={pokeId}
            layout='fill'
            loading="lazy"
      />
    )
}

export default PokemonImage