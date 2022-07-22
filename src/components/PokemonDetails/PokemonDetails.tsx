import React from 'react'
import { createUseStyles } from 'react-jss';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box'; 
import Grid from '@mui/material/Grid';
import { Pokemon } from '../../hooks/useGetSinglePokemon';

export interface PokemonDetailsProps {
    pokemon: Pokemon;
}
const PokemonDetails = (props:PokemonDetailsProps) => {
    const classes = useStyles();
    const {pokemon} = props; 
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <img className={classes.avatar} src={pokemon?.image} alt={pokemon?.name}/>
                </Grid>
                <Grid item xs={8}>
                    <div>{pokemon?.classification}</div>
                    {pokemon?.resistant && <>
                        <div className={classes.marginTop}>Resistant</div>
                        <Stack direction="row" className={classes.flex} spacing={1}>
                            {pokemon?.resistant?.map((item, index)=><Chip label={item} key={index}/>)}
                        </Stack>
                    </> 
                    }
                    {pokemon?.types && <>
                        <div  className={classes.marginTop}>Types</div>
                        <Stack direction="row"  className={classes.flex}  spacing={1}>
                            {pokemon?.types?.map((item, index)=><Chip label={item} key={index}/>)}
                        </Stack>
                        </>
                    }
                    {pokemon?.weaknesses && <>
                        <div className={classes.marginTop}>Weaknesses</div>
                        <Stack direction="row"  className={classes.flex}  spacing={1}>
                            {pokemon?.weaknesses?.map((item, index)=><Chip label={item} key={index}/>)}
                        </Stack>
                    </>
                     }
                </Grid>
            </Grid>
        </Box>
    )
  
}
const useStyles = createUseStyles({
    pokemonDetailsContainer:{
        display:'flex',
    },
    marginTop:{
        marginTop:'20px',
        marginBottom:'10px',
    },
    flex:{
        display: 'flex',
        marginBottom:'10px',
    },
    avatar:{width:'100%', height:'auto',}
})

export default PokemonDetails