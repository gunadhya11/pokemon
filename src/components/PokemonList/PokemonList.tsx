 
import React from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { Link } from 'react-router-dom'; 

export const PokemonList = () => {
  const classes = useStyles(); 
  const { pokemons,  loading } = useGetPokemons();  

  return (
    <div className={classes.root}>
      {loading && <div>Loading...</div>}
      {pokemons.map((pkmn) => (
        <Link to={`/img/${pkmn.id}`} className={classes.listItem} key={pkmn.id} >
            <img className={classes.image} src={pkmn.image} alt={pkmn.name}/>
            <div>{pkmn.number}</div>
            <div>{pkmn.name}</div>
            <div className={classes.typesPillContainer}>
              {pkmn?.types?.map((item,index)=><span className={classes.typesPill} key={index}>{item}</span>)}
            </div>
        </Link>
      ))} 
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%', 
      padding: '32px',
      boxSizing: 'border-box',
    },
    listItem:{
      border: '1px solid #fff',
      padding:'10px',
      color:'#fff',
      marginTop:'5px',
      display:'flex',
      alignItems:'center',
      justifyContent:'flex-start',
      gap:'50px',
      opacity: '0.5',
      borderRadius:'5px',
      "&:hover": {
        opacity: '1.0', 
      },
    },
    typesPillContainer:{
      justifySelf:'end',
    },
    typesPill:{
      backgroundColor: '#fff',
      color: '#000',
      padding:'4px',
      marginRight: '10px',
      borderRadius:'10px',
      paddingLeft:'10px',
      paddingRight:'10px',
      justifySelf:'end',
    },
    image:{
      height:'auto',
      width:'60px',
      borderRadius:'5px',
    }
  },
  { name: 'PokemonList' }
);
