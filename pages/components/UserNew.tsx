import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import { useEffect, useState } from "react"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import { defaultPokemonsArray, ValidDefaultPokemonId } from "../helpers"
import PokemonImage from "./PokemonImage"
import { styled } from "@mui/material/styles"
import useUserSettings from "../useUserSettings"
import { useRouter } from "next/router"
import { routes } from "../routes"

const GabrielsTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "yellow",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "orange",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "orange",
    },
    "&.Mui-focused fieldset": {
      borderColor: "yellow",
    },
  },
})

const UserNew = () => {
  const [name, setName] = useState("")
  const [defaultPokemon, setDefaultPokemon] = useState<ValidDefaultPokemonId>(1)
  const { setUserSettings } = useUserSettings()
  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }
  const handleClickPlay = () => {
    setUserSettings([
      ["name", name],
      ["pokemonOfChoice", defaultPokemon],
    ])
    router.push(routes.game)
  }

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch(routes.game)
  }, [])

  return (
    <Box textAlign={"center"}>
      <Box mb={5}>
        <Typography variant='h4' gutterBottom>
          Hva heter du?
        </Typography>
        <GabrielsTextField
          id='outlined-name'
          label='Name'
          InputProps={{ style: { fontSize: "xx-large" } }}
          color='secondary'
          fullWidth
          value={name}
          onChange={handleChange}
        />
      </Box>
      <Box mb={5}>
        <Typography variant='h4'>Velg pokémon</Typography>

        <ImageList sx={{ height: 105 }} cols={3} rowHeight={100} gap={1}>
          {defaultPokemonsArray.map((id: ValidDefaultPokemonId) => (
            <ImageListItem key={id.toString()}>
              <Box
                style={{
                  border: defaultPokemon === id ? "2px solid" : "0px",
                  height: "100%",
                  width: "100%",
                }}
                onClick={() => setDefaultPokemon(id)}
              >
                <PokemonImage pokeId={id.toString()} />
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Box className='rainbow-button playmore' onClick={handleClickPlay}></Box>
    </Box>
  )
}

export default UserNew
