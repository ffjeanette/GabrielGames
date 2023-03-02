import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Top from "./components/Top";
import UserPokedex from "./UserPokedex";

const PokedexPage = () => {
    return (
        <>
        <Top />
        <UserPokedex height={'100%'} />

        </>
    )
}

export default PokedexPage