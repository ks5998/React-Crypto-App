import { Container, Typography } from '@material-ui/core';
import React from 'react'
import '../../App.css';
import Carousel from './Carousel';

//this page contains all the frontpage banners such as title, carousel, 

const Banner = () => {
  return (
    <div className='banner'>
        <Container className='bannerContainer'>
            <div className="bannerTitle">
                <Typography
                    variant='h2'
                    className='bannerTypography1'
                    > Crypto Hunter 
                </Typography>
                <Typography 
                    variant='subtitle2'
                    className='bannerTypography2'>
                    Get all the info regarding your favourite Crypto Coins
                </Typography>
            </div>
            <Carousel />
        </Container>
    </div>
  )
}

export default Banner