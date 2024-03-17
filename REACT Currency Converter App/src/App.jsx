import { Box, Grid } from '@mui/material'
import { Container } from '@mui/system'
import {Typography} from '@mui/material'
import InputAmount from './components/InputAmount';
import SelectCountry from './components/SelectCountry';
import SwitchCurrency from './components/SwitchCurrency';
import {useContext, useEffect, useState } from 'react';
import { CurrencyContext } from './context/CurrencyContext';
import axios from 'axios';

function App() {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    firstAmount,
  } = useContext(CurrencyContext)

  const [resultCurrency,setResultCurrency]=useState(0);
  const codeFromCurrency = fromCurrency.split(" ")[1];
  const codeToCurrency = toCurrency.split(" ")[1];
  
  

useEffect(() =>{
  
  if(firstAmount){
    axios("https://api.freecurrencyapi.com/v1/latest",{
      params:{
        apikey:'fca_live_mZ4Po7w0MdaO2KIeUaDm2sewCo4WpJgIMVoeYW2A',
        base_currency:codeFromCurrency,
        currencies:codeToCurrency
        
      }
      
    
    })
    .then(response => setResultCurrency(Math.round(response.data.data[codeToCurrency])))
    .catch(error => console.log(error));

  }
}, [firstAmount,codeToCurrency])
console.log(codeToCurrency)

  const boxStyles = {
    background:"#D8D9DA",
    marginTop: "12rem",
    color: "#222",
    minHeight: "20rem",
    maxWidth:"70%",
    borderRadius: 10,
    padding: "3rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1);",
    position: "relative"
     
  }
  const mobileMediaQuery = {
    '@media (max-width: 600px)': {
      marginTop: "2rem",
    },
  };

  return (
    <Container maxWidth="md" sx={{...boxStyles,...mobileMediaQuery}}>
     
      <Typography variant="h5" sx={{marginBottom:"2rem"}}>Seamless Conversions On the Go</Typography>
      <Grid container spacing={2}>
        <InputAmount  />
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From"/>
        <SwitchCurrency/>
        <SelectCountry value={toCurrency} setValue={setToCurrency} label="To"/>
      
      </Grid>
      {firstAmount ?( 
        <Box sx={{textAlign:"left",marginTop:"1rem"}}>
          <Typography>{firstAmount} {fromCurrency} = </Typography>
          <Typography variant='h4' sx={{marginTop:"4px",fontSize:"25px" ,fontWeight:"bold"}}>{(resultCurrency*firstAmount)} {toCurrency}</Typography>
          
        </Box>
      ): ""}
    </Container>
  )
}

export default App
