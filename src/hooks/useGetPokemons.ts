import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  resistant: any; 
  image: string | undefined;
  id: string;
  name: string;
  number: string;
  types: Array<string>;
};

export type PokemonOption = {
  value: Pokemon['id'];
  label: Pokemon['name'];
};

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      number
      image
      weight{
        minimum
        maximum
      }
      height{
        minimum
        maximum
      }
      classification
      types
    }
  }
`;

export const useGetPokemons = () => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      first: 151, // Keep hard coded
    },
  });

  const pokemons: Pokemon[] = useMemo(() => data?.pokemons || [], [data]);

  const pokemonOptions: PokemonOption[] = useMemo(
    () => pokemons.map((p: Pokemon) => ({ value: p.id, label: p.name })),
    [pokemons]
  );

  return {
    pokemons,
    pokemonOptions,
    ...queryRes,
  };
};
