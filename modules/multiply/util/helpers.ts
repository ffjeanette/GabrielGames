import pokemons from "./pokemonLocal"

//const pokedexCount = 1154 could not find image above 905
const pokedexCount = 905
const pokedexCountWhenJson = pokemons.length

export const colors_pokeTypes = {
  fire: "#FDDFDF",
  grass: "#DEFDE0",
  electric: "#FCF7DE",
  water: "#DEF3FD",
  ground: "#f4e7da",
  rock: "#d5d5d4",
  fairy: "#fceaff",
  poison: "#F0D3FF",
  bug: "#f8d5a3",
  dragon: "#97b3e6",
  psychic: "#eaeda1",
  flying: "#F5F5F5",
  fighting: "#E6E0D4",
  normal: "#F5F5F5",
  unknown: "transparent",
  ice: "#f0f8ff",
  steel: "#b0c4de",
  dark: "#2e2e2e",
  ghost: "#FFF",
}

//1. Bulbasaur
//7. Squirtle
//4. Charmander
export type ValidDefaultPokemonId = 1 | 7 | 4

export const defaultPokemonsArray: Array<ValidDefaultPokemonId> = [1, 7, 4]

const defaultPokemons: Set<number> = new Set()
defaultPokemons.add(1) //1. Bulbasaur
defaultPokemons.add(7) //7. Squirtle
defaultPokemons.add(4) //4. Charmander

const getRandomInt = (maxNumber: number): number => {
  const min = Math.ceil(1)
  const max = Math.floor(maxNumber)
  const int = Math.floor(Math.random() * (max - min) + min)

  if (defaultPokemons.has(int)) {
    return getRandomInt(maxNumber)
  }

  return Math.floor(Math.random() * (max - min) + min) // The maximum is exclusive and the minimum is inclusive
}

export const getMyPokedexIds = (
  dexCount: number = 100,
  currentDex?: Array<number>
): Set<number> => {
  const random100Pokemen = currentDex ? new Set(currentDex) : new Set()

  while (random100Pokemen.size < dexCount) {
    random100Pokemen.add(getRandomInt(pokedexCount))
  }

  return random100Pokemen as Set<number>
}

const neededPoints = 5
export const getCountVisiblePokemons = (countGames: number) => {
  const status = countGames / neededPoints
  const statusCountPokemons = Math.floor(status) //round down
  return statusCountPokemons
}
