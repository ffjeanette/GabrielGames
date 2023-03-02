import { Typography } from "@mui/material";
import useUserSettings from "../hooks/useUserSettings";
import Box from "@mui/material/Box";
import { getCountVisiblePokemons } from "../util/helpers";
import PokemonImage from "./PokemonImage";
import { useRouter } from "next/router";
import { routes } from "../util/routes";

const UserReturning = () => {
  const router = useRouter();

  const {
    userSettings: { name, countGames, pokemonOfChoice },
  } = useUserSettings();

  const handleClickPlayAgain = () => {
    router.push(routes.game);
  };

  return (
    <Box textAlign={"center"}>
      <Box>
        <Typography variant="h3" gutterBottom>
          Hei {name}!
        </Typography>
      </Box>
      <Box width={150} height={150} position="relative" display="inline-block">
        <PokemonImage pokeId={pokemonOfChoice.toString()} />
      </Box>
      <Box mb={5}>
        <Typography variant="body1">
          Du har fanget {getCountVisiblePokemons(countGames)} pokémons
        </Typography>
      </Box>
      <Box
        className="rainbow-button playmore"
        onClick={handleClickPlayAgain}
      ></Box>
    </Box>
  );
};

export default UserReturning;
