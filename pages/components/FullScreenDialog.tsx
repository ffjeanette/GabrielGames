import * as React from "react"
import Dialog from "@mui/material/Dialog"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Slide from "@mui/material/Slide"
import { TransitionProps } from "@mui/material/transitions"
import { PokemonModel } from "../pokemonLocal"
import PokemonImage from "./PokemonImage"
import { Box } from "@mui/system"
import { colors_pokeTypes } from "../helpers"

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />
})

type Props = {
  open: boolean
  setOpen: (open: boolean) => void
  pokemon: null | PokemonModel
}
export default function FullScreenDialog({ open, setOpen, pokemon }: Props) {
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge='start'
              color='inherit'
              onClick={handleClose}
              aria-label='close'
            >
              X
            </IconButton>
            <Typography
              sx={{ ml: 2, flex: 1 }}
              variant='h6'
              component='div'
              textTransform={"uppercase"}
            >
              {pokemon?.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          display={"flex"}
          justifyContent='center'
          alignItems={"center"}
          flexDirection='column'
        >
          <Box position={"relative"} height={150} width={150}>
            <PokemonImage pokeId={pokemon?.id?.toString() ?? ""} />¨
          </Box>
          <Typography variant='h2'>{pokemon?.name}</Typography>
        </Box>
        <Box width={"80%"} margin={"0 auto"}>
          <Typography gutterBottom>{pokemon?.description}</Typography>
          <Typography align='center'>
            {pokemon?.types.map((type) => (
              <span key={type}>
                {type}{" "}
                <span
                  style={{
                    display: "inline-block",
                    backgroundColor:
                      colors_pokeTypes[type || "unknown"] ?? "transparent",
                    height: 15,
                    width: 15,
                    marginRight: 10,
                  }}
                ></span>
              </span>
            ))}
          </Typography>
          <br />
          <Typography>Høyde: {pokemon?.height}</Typography>
          <Typography>Vekt: {pokemon?.weight}</Typography>
          <Typography>Arter: {pokemon?.species}</Typography>
        </Box>
      </Dialog>
    </div>
  )
}
