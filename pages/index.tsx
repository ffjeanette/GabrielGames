import type { NextPage } from "next";
import useUserSettings from "../modules/multiply/hooks/useUserSettings";
import UserNew from "../modules/multiply/components/UserNew";
import UserReturning from "../modules/multiply/components/UserReturning";

const Home: NextPage = () => {
  const { userSettings } = useUserSettings();

  return (
    <>
      {userSettings.name && userSettings.pokemonOfChoice ? (
        <UserReturning />
      ) : (
        <UserNew />
      )}
    </>
  );
};

export default Home;
