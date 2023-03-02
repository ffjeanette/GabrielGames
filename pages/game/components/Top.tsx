import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from "@mui/material"
import pokemons from "../../pokemonLocal"
import useUserSettings from "../../useUserSettings"
import PaidIcon from '@mui/icons-material/Paid'
import { useRouter } from "next/router"
import { routes } from "../../routes"
import { useEffect } from "react"

const Top = () => {
    const router = useRouter()
    const {userSettings: { name, countGames, pokemonOfChoice }} = useUserSettings()

    const pokemon = pokemons.find(pokemon => pokemon.id === pokemonOfChoice)

    const handleClickPokemonImage = () => router.push(routes.pokedex)

    useEffect(() => {
        // Prefetch the dashboard page
        router.prefetch(routes.pokedex)
      }, [])

    return (
        <AppBar>
        <Toolbar>
          <Typography     
            variant="h5"          
            noWrap
            component="div">
            {name}
          </Typography>
        <PaidIcon  sx={{ ml: 2, color: 'yellow' }} />
        <Typography color={'yellow'} variant="h5" component="div" sx={{ ml: 0.5, flexGrow: 1}} >
            {countGames}
          </Typography>
          <Box sx={{ flexGrow: 0 }}>
              <IconButton onClick={handleClickPokemonImage} sx={{ p: 0 }}>
                {pokemon?.sprite && <Avatar alt="My pokemon" src={pokemon.sprite} />}
                </IconButton>
            </Box>
        </Toolbar>
      </AppBar>
    )
}

export default Top