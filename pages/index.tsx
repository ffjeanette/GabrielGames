import type { NextPage } from "next"
import useUserSettings from "./useUserSettings"
import UserNew from "./components/UserNew"
import UserReturning from "./components/UserReturning"

const Home: NextPage = () => {
  const { userSettings } = useUserSettings()

  return (
    <>
      {userSettings.name && userSettings.pokemonOfChoice ? (
        <UserReturning />
      ) : (
        <UserNew />
      )}
    </>
  )
}

export default Home
