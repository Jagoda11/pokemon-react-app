import './PokemonList.css'

import Loader from './Loader'
import PokemonPreview from './PokemonPreview'
import React from 'react'
import { usePokemonList } from '../hooks/usePokemonList'
import { useSearchParams } from 'react-router-dom'

const PokemonList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const offset = Number.parseInt(searchParams.get('offset') || '0', 10)
  const { pokemonList, loading, error, hasNext } = usePokemonList({ offset })

  const handleNext = () => {
    setSearchParams({ offset: (offset + 10).toString() })
  }

  const handlePrevious = () => {
    const newOffset = Math.max(offset - 10, 0)
    setSearchParams({ offset: newOffset.toString() })
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Pokemon List</h2>
      <div className="flex justify-between mb-4">
        <button
          onClick={handlePrevious}
          disabled={offset === 0 || loading}
          aria-label="Previous Page"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={!hasNext || loading}
          aria-label="Next Page"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>
            <PokemonPreview pokemon={pokemon} offset={offset} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonList
