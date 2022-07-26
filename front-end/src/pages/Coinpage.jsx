import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import '../App.css';
import CoinInfo from '../components/CoinInfo';
import { LinearProgress, Typography } from '@material-ui/core';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';


function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Coinpage = () => {

  const { id } = useParams();
  const [coin, setCoin] = useState();
  
  const { currency, symbol } = CryptoState();
  
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  }
  console.log(coin);

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: 'gold'}} />

  return (
    <div className='coinPageContainer'>
      <div className="coinPageSidebar">
        <img 
          src={ coin?.image.large } 
          alt={ coin?.name} 
          height='200' 
          style={{ marginBottom: 20 }}
          />
        <Typography 
          variant='h3'
          className='coinHeading'
        > { coin?.name } 
        </Typography>
        <Typography 
          variant='subtitle1'
          className='coinDescription'
        > { ReactHtmlParser( coin?.description.en.split('. ')[0]) }
        </Typography>
        
        <div className="coinData">
          <span style={{ display: 'flex' }}>
            <Typography
              variant='h5'
              className='coinHeading'
            >
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
            >
              { coin?.market_cap_rank}
            </Typography>
          </span>&nbsp;
          <span style={{ display: 'flex' }}>
            <Typography
              variant='h5'
              className='coinHeading'
            >
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
            >
              {symbol}{' '}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>&nbsp;
          <span style={{ display: 'flex' }}>
            <Typography
              variant='h5'
              className='coinHeading'
            >
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant='h5'
            >
             {symbol}{' '}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                .toString()
                .slice(0, -6)
              )}M
            </Typography>
          </span>&nbsp;
        </div>
      </div>
      <CoinInfo coin={ coin }/>
    </div>
  )
}

export default Coinpage