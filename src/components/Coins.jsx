import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, HStack, Button, VStack, Image, Heading, Text, RadioGroup, Radio } from '@chakra-ui/react';

import { server } from '../main';
import Loader from './Loader';
import Error from './Error';
import CoinCard from './CoinCard';

const Exchanges = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  const btns = new Array(132).fill(1);

  const changePage = (page) => {
    setPage(page);
    setLoading(true);
  };

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`);
        setCoins(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        seterror(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, [currency, page])

  if (error) {
    return <Error message="Error while fetch currency and page" />
  }

  return (
    <Container maxW={'container.xl'}>
      {
        loading ? <Loader /> : <>

          <RadioGroup value={currency} onChange={setCurrency} p={8} >
            <HStack spacing={"4"} >
              <Radio value='inr' >INR</Radio>
              <Radio value='usd' >USD</Radio>
              <Radio value='eur' >EUR</Radio>
            </HStack>
          </RadioGroup>

          <HStack wrap={"wrap"} justifyContent={'space-evenly'} >
            {
              coins.map((i) => {
                return <CoinCard id={i.id} key={i.id} name={i.name} img={i.image} symbol={i.symbol} price={i.current_price} currencySymbol={currencySymbol} />
              })
            }
          </HStack>

          <HStack w={'full'} overflowX={"scroll"} p={8}>
            {btns.map((item, index) => {
              return <Button key={index} bgColor={'blackAlpha.900'} color={'white'} onClick={() => changePage(index + 1)}>
                {index + 1}
              </Button>

            })}
          </HStack>

        </>
      }
    </Container>

  )
}

export default Exchanges