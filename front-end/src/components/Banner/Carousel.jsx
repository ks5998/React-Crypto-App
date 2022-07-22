import React from 'react';
import '../../App.css';
import axios from 'axios';
import { TrendingCoins } from '../../config/api';
import { CryptoState } from '../../CryptoContext';
import { useState } from 'react';
import { useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {

    const [trending, setTrending] = useState([]);
    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
    };
    console.log(trending);

    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);



    //this is for our carousel - here 0 means when the screen is 0px or above upto 511px then 
    //the carousel will automatically display 2 images at a time...
    //and when the the pixels increases above 511 then it will show 4 images at a time.
    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    //here creating the items component inside which all the images will be present which i want to show in the carousel
    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return(
            <Link 
                className='carouselLink'
                to={`/coins/${coin.id}`}
            >
                <img 
                    src={coin?.image} 
                    alt={coin.name}
                    height='80'
                    className='carouselimg'
                 />
                <span> {coin?.symbol} &nbsp;
                    <span style={{ 
                        color: profit > 0 ? 'green' : 'red'
                    }}> {profit && '+'} {coin.price_change_percentage_24h?.toFixed(2)}% </span>
                </span>  
                <span style={{ fontSize: 22, fontWeight: 500 }}> {symbol} {numberWithCommas(coin?.current_price.toFixed(2))} </span>
            </Link>
        )
    })

  return (
    <div className="carousel">
        <AliceCarousel 
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}/>
    </div>
  )
}

export default Carousel