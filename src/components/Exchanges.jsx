import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, HStack, Button, VStack, Image, Heading, Text } from '@chakra-ui/react'

import { server } from '../main';
import Loader from './Loader';
import Error from './Error';

const Exchanges = () => {

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(false);

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        seterror(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, [])

  if (error){
    return <Error message="Error while fetch exchange coins" />
  }

  return (
    <Container maxW={'container.xl'}>
      {
        loading ? <Loader /> : <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {
              exchanges.map((i) => {
                return <ExchangeCard key={i.id} name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} />
              })
            }
          </HStack>

        </>
      }
    </Container>

  )
}

const ExchangeCard = ({ id, name, img, rank, url }) => {

  return (
    <a href={url} target='blank' >
      <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={'all 0.3s'} m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)"
          }
        }} >
        <Image src={img} w={"10"} h={"10"} objectFit={'contain'} alt={name} />

        <Heading size={"md"} noOfLines={1}> {rank} </Heading>

        <Text noOfLines={1}> {name} </Text>

      </VStack>

    </a>
  );

}

export default Exchanges