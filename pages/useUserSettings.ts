import { useCallback, useEffect } from "react"
import { getMyPokedexIds } from "./helpers"
import useLocalStorage from "./useLocalStorage"

type UserSettings = {
  name: string
  pokemonOfChoice: number
  countGames: number
  pokedexIds: number[]
}
const useUserSettings = () => {
  const [userLocalStorageSettings, setUserLocalStorageSettings] =
    useLocalStorage("userSettings", {
      name: "",
      pokemonOfChoice: 0,
      countGames: 0,
      pokedexIds: [],
    })

  const setUserSettings = useCallback(
    (fields: (string | keyof UserSettings | number[] | number)[][]) => {
      const newData = Object.fromEntries(fields)
      setUserLocalStorageSettings({
        ...userLocalStorageSettings,
        ...newData,
      })
    },
    [setUserLocalStorageSettings, userLocalStorageSettings]
  )

  useEffect(() => {
    //OBS: TODO: Denne kjører 4 ganger
    if (userLocalStorageSettings.pokedexIds) {
      if (!userLocalStorageSettings.pokedexIds.length) {
        const pokeids = getMyPokedexIds()
        setUserSettings([["pokedexIds", Array.from(pokeids)]])
      }
      if (
        userLocalStorageSettings.countGames >= 500 &&
        userLocalStorageSettings.pokedexIds.length === 100
      ) {
        //TODO: Later we could implement just adding more to the dex if needed
        const pokeids = getMyPokedexIds(
          200,
          userLocalStorageSettings.pokedexIds
        )
        setUserSettings([["pokedexIds", Array.from(pokeids)]])
      }
    }
  }, [
    setUserSettings,
    userLocalStorageSettings.countGames,
    userLocalStorageSettings.pokedexIds,
  ])

  return {
    userSettings: userLocalStorageSettings,
    setUserSettings,
  }
}

export default useUserSettings
