import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import useUserSettings from '../useUserSettings'
import PokemonImage from '../components/PokemonImage'
import ImageList from '@mui/material/ImageList';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ImageListItem from '@mui/material/ImageListItem';
import { useState } from 'react';
import FullScreenDialog from '../components/FullScreenDialog';
import pokemons, { PokemonModel } from '../pokemonLocal'
import { getCountVisiblePokemons } from '../helpers';

type Props = {
    height?: number | string
    width?: number | string
}

const UserPokedex = ({ 
    height = 500,
    width = 450
}: Props) => {
    const [open, setOpen] = useState(false);
    const [clickedPokemon, setClickedPokemon] = useState<null | PokemonModel>(null);
    const {userSettings: { pokedexIds, countGames }} = useUserSettings()

    const handleClickOpen = (id: number) => {
        setOpen(true);
        //setClickedPokemon(id)
        setClickedPokemon(pokemons.find(pokemon => pokemon.id === id) || null)
    };

    const handleClickOpenDisabled = () => {

    }

    const countVisiblePokemons = getCountVisiblePokemons(countGames)
    
    if(!pokedexIds) {
        return (<></>)
    }
    
    return (<>
            <ImageList sx={{ width, height, maxWidth: '100%' }} cols={3} rowHeight={100} gap={1}>

                {pokedexIds.map((id: number, index: number) => {


                    const visiblePokemon = (index + 1) <= countVisiblePokemons

                    return (
                    <ImageListItem key={id.toString()} onClick={() => visiblePokemon ? handleClickOpen(id) : handleClickOpenDisabled}>
                        <Box style={{ opacity: visiblePokemon ? 1 : 0.2 }}>
                        {index+1} / {pokedexIds.length}
                        <PokemonImage pokeId={id.toString()} />
                            </Box>
                    </ImageListItem>
                )})} 
        </ImageList>
        <FullScreenDialog open={open} setOpen={(open) => setOpen(open)} pokemon={clickedPokemon}/>
        </>
    )
}

export default UserPokedex