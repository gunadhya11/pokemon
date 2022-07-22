import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  image: string | undefined;
  id: string;
  name: string;
  number: string;
  types: Array<string>;
  classification: string;
  resistant: Array<string>;
  weaknesses: Array<string>;
};

export const GET_POKEMON = gql`
query pokemon($id: String, $name: String){
    pokemon(id: $id, name: $name){
      id
      number
      name
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
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetSinglePokemon = (id:string | undefined, name?:string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON, {
    variables: {
        id,
        name,  
    },
  });

  const pokemon: Pokemon = useMemo(() => data?.pokemon || {}, [data]);
  return {
    pokemon, 
    ...queryRes,
  };
};
