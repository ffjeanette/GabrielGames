import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";

const Top = () => {

    const router = useRouter()

    const handleClose = () => {
        router.back()
    }

    return (
        <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            X
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div" textTransform={'uppercase'}>
            Din pokedex
          </Typography>
        </Toolbar>
      </AppBar>
      
    )
}

export default Top