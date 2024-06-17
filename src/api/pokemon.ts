import { EvolutionChain, PokemonDetails, PokemonListResponse, PokemonSpecies } from '../types'

const HOST = 'https://pokeapi.co/api/v2'

export const fetchPokemonList = async ({
  offset = 0,
  limit = 10,
}: {
  offset?: number
  limit?: number
}): Promise<PokemonListResponse> => {
  const response = await fetch(`${HOST}/pokemon?limit=${limit}&offset=${offset}`)
  if (!response.ok) {
    throw new Error(`API call failed with status: ${response.status}`)
  }
  const data: PokemonListResponse = await response.json()

  return data
}

export const getPokemonDetails = async (name: string): Promise<PokemonDetails> => {
  const response = await fetch(`${HOST}/pokemon/${name}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${name} details with status: ${response.status}`)
  }
  const details: PokemonDetails = await response.json()
  return details
}

export const getPokemonSpecies = async (pokemon: PokemonDetails): Promise<PokemonSpecies> => {
  const speciesResponse = await fetch(pokemon.species.url)
  if (!speciesResponse.ok) throw new Error('Failed to fetch species details.')
  const speciesData: PokemonSpecies = await speciesResponse.json()

  return speciesData
}

export const getPokemonEvolutions = async (
  speciesData: PokemonSpecies,
): Promise<{ chain: EvolutionChain }> => {
  const evolutionResponse = await fetch(speciesData.evolution_chain.url)
  if (!evolutionResponse.ok) throw new Error('Failed to fetch evolution chain.')
  const evolutionData: { chain: EvolutionChain } = await evolutionResponse.json()

  return evolutionData
}
