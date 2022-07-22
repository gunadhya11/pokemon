import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import PokemonDetails  from '../PokemonDetails'
import Typography from '@mui/material/Typography';
import {
  Routes,
  Route,
  Outlet,
  Link,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useGetSinglePokemon } from '../../hooks/useGetSinglePokemon';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};



export default function CustomizedDialogs() { 
    let navigate = useNavigate();
    let { id } = useParams<"id">();
    const {pokemon} = useGetSinglePokemon(id);
    function onDismiss() {
      navigate(-1);
    }

  return (
    <div>
      
      <BootstrapDialog
        onClose={onDismiss}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={onDismiss}>
          {pokemon.name}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <PokemonDetails pokemon={pokemon}/>
          
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onDismiss}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
