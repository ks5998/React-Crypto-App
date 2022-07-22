import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import '../App.css';
import { Link } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const { currency, symbol } = CryptoState();

    const fetchCoinsList = async () => {

        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };
    console.log(coins)

    useEffect(() => {
        fetchCoinsList();
    }, [currency]);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            type: 'dark',
        }
    });

    const handleSearch = () => {
        return coins.filter((coin) => (
            coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
        ))
    }

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: 'center'}}>
            <Typography 
                variant='h4'
                className='coinsTableTypography'>
                Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField 
                label='search a Crypto'
                variant='outlined'
                className='coinsTableTextfield'
                onChange={(e) => setSearch(e.target.value)}
            />
            <TableContainer>
                {
                    loading ? (
                        <LinearProgress style={{ backgroundColor: 'gold' }} />
                    ) : (
                        <Table>
                            <TableHead style={{ backgroundColor: 'darkgoldenrod'}}>
                                <TableRow>
                                    {[
                                        'coin', 'price', '24h Change', 'Market Cap'
                                    ].map((head) => (
                                        <TableCell 
                                            className='tableCell'
                                            key={head}
                                            align={head === 'coin' ? '' : 'right'}>
                                                {head}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {handleSearch().slice((page -1) * 10, (page - 1) * 10 + 10).map((row) => {
                                const profit = row.price_change_percentage_24h > 0;
                                return(
                                    <TableRow
                                        onClick={() => <Link to={`/coins/${row.id}`}></Link>}
                                        className='tableRow'
                                        key={row.name}
                                    >
                                        <TableCell
                                            component='th'
                                            scope='row'
                                            className='tableCell'
                                        >
                                            <img 
                                                src={row?.image} 
                                                alt={row.name}
                                                height='50'
                                                style={{ marginBottom: 10 }} 
                                            />
                                            <div
                                                style={{ display: 'flex', flexDirection: 'column' }}
                                            >
                                                <span 
                                                    style={{ textTransform: 'uppercase', fontSize: 22, color: 'white'}}
                                                >
                                                    {row.symbol}
                                                </span>
                                                <span
                                                    style={{ color: 'darkgrey'}}
                                                >
                                                    {row.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell
                                            align='right'
                                        >
                                            {symbol}{' '}
                                            {numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>
                                        <TableCell
                                            align='right'
                                            style={{ color: profit > 0 ? 'green' : 'red', fontWeight: 500}}
                                        >
                                            {profit && '+'}
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell
                                            align='right'
                                        >
                                            {symbol}{' '}
                                            {numberWithCommas(row.market_cap.toString().slice(0, -6))} M
                                            
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
                <Pagination 
                    className='pagination'
                    count={(handleSearch()?.length/10).toFixed(0)}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}/>
        </Container>
    </ThemeProvider>
  )
}

export default CoinsTable