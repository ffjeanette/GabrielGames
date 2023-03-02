import { Box, Typography, Button } from "@mui/material"
import { useRouter } from "next/router"
import Top from "../game/components/Top"
import { routes } from "../routes"

const GamefinishedPage = () => {
  const router = useRouter()

  const handleClickPlayAgain = () => {
    router.push(routes.game)
  }
  const handleClickPokedex = () => {
    router.push(routes.pokedex)
  }
  return (
    <>
      <Top />
      <Box textAlign={"center"}>
        <Typography variant='h3'>WOOOW! </Typography>
        <Typography variant='h4'>Du rundet spillet!</Typography>
        <Typography variant='h5'>Hva vil du gjøre nå?</Typography>
        <Box mt={3}>
          <Box
            className='rainbow-button playmore'
            onClick={handleClickPlayAgain}
          />
        </Box>
        <Box mt={3}>
          <Box
            className='rainbow-button pokedex'
            onClick={handleClickPokedex}
          />
        </Box>
      </Box>
    </>
  )
}

export default GamefinishedPage
