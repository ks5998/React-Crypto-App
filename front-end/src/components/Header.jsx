import { AppBar, Container, Toolbar, Typography, Select, MenuItem } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { CryptoState } from '../CryptoContext';

const Header = () => {

    const { currency, setCurrency } = CryptoState();
    console.log(currency)
    
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: 'dark',
        }
    })
    return (
        <ThemeProvider theme={darkTheme}>
        <AppBar color='transparent' position='static'>
            <Container>
                <Toolbar className='toolbar'>
                    <Link to={'/'} >
                    <Typography className='title' variant>Crypto Hunter</Typography>
                    </Link>
                    <Select 
                        variant='outlined'
                        className='select'
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}> 
                        <MenuItem value={'USD'}>USD</MenuItem>
                        <MenuItem value={'INR'}>INR</MenuItem>
                    </Select>
                </Toolbar>
            </Container>
        </AppBar>
        </ThemeProvider>
    );
}

export default Header;