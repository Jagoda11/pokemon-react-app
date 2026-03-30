import '@testing-library/jest-dom'

import * as api from '../api/pokemon'
import * as hooks from '../hooks/usePokemonDetails'

import React, { act } from 'react'
import { render, screen, waitFor } from '@testing-library/react'

import PokemonDetail from './PokemonDetail'
import { BrowserRouter as Router } from 'react-router-dom'
import { vi } from 'vitest'

// Mock the useParams hook to simulate receiving a parameter
vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useParams: () => ({
    name: 'pikachu',
  }),
  useNavigate: () => vi.fn(),
  useLocation: () => ({
    state: { offset: 0 },
  }),
}))

// Mock the usePokemonDetails hook
vi.mock('../hooks/usePokemonDetails')
vi.mock('../api/pokemon')

const mockPokemonDetails = {
  name: 'pikachu',
  abilities: [{ ability: { name: 'static' } }],
  sprites: { front_default: 'http://example.com/pikachu.png' },
  species: { url: 'http://example.com/species/pikachu' },
  evolution: {
    chain: {
      evolves_to: [
        {
          species: {
            name: 'raichu',
            url: 'http://example.com/species/raichu',
          },
        },
      ],
    },
  },
}

const mockUsePokemonDetails = hooks.usePokemonDetails as vi.Mock
const getPokemonSpecies = api.getPokemonSpecies as vi.Mock
const getPokemonEvolutions = api.getPokemonEvolutions as vi.Mock

describe('🧐 PokemonDetail 🧐', () => {
  beforeEach(() => {
    mockUsePokemonDetails.mockImplementation(() => ({
      details: mockPokemonDetails,
      loading: false,
      error: null,
    }))

    getPokemonSpecies.mockResolvedValue({
      evolution_chain: { url: 'http://example.com/evolution/1' },
    })

    getPokemonEvolutions.mockResolvedValue({
      chain: { species: { name: 'test' }, evolves_to: [] },
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('🚀 renders without crashing', async () => {
    await act(async () =>
      render(
        <Router>
          <PokemonDetail />
        </Router>,
      ),
    )

    expect(screen.getByText(mockPokemonDetails.name)).toBeInTheDocument()
  })

  it('🔄 displays loader when loading', async () => {
    mockUsePokemonDetails.mockImplementation(() => ({
      details: null,
      loading: true,
      error: null,
    }))

    await act(() =>
      render(
        <Router>
          <PokemonDetail />
        </Router>,
      ),
    )

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })

  it('❌ displays error message when there is an error', async () => {
    const errorMessage = 'Failed to fetch data'
    mockUsePokemonDetails.mockImplementation(() => ({
      details: null,
      loading: false,
      error: errorMessage,
    }))

    await act(() =>
      render(
        <Router>
          <PokemonDetail />
        </Router>,
      ),
    )

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument()
  })

  it('displays pokemon details 📝 when data is available', async () => {
    await act(() =>
      render(
        <Router>
          <PokemonDetail />
        </Router>,
      ),
    )

    await waitFor(() => {
      expect(screen.getByText(mockPokemonDetails.name)).toBeInTheDocument()
      expect(screen.getByText(mockPokemonDetails.abilities[0].ability.name)).toBeInTheDocument()
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        mockPokemonDetails.sprites.front_default,
      )
    })
  })
})
