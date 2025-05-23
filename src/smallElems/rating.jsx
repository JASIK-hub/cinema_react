import React from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import '../styles/App.css'

export default function StarRating() {
  return (
    <Box
      sx={{
        width: 601,       
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        backgroundColor:'#1E1E1E',
        flexDirection: 'column',
        padding:'30px 0px',
        margin:'20px auto',
        borderRadius:5,
      }}
    >
      <Typography component="legend" style={{color:'var(--gray)',fontSize:'20px'}}>Set A Rate</Typography>
      <Rating name="customized-10" defaultValue={10} max={10}
      sx={{
        fontSize:40,
        color:'var(--gray)',

      }} />
    </Box>
  );
}
