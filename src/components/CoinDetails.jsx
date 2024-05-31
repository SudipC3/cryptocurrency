import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, HStack, Button, VStack, Image, Heading, Text, RadioGroup, Radio, Box, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress } from '@chakra-ui/react';

import { server } from '../main';
import Loader from './Loader';
import Error from './Error';
import Charts from './Charts';


const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, seterror] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);

  const btns = ["24h", "7d", "14d", "30d", "60d", "200d", "1y", "max"];
  const switchChart = (key) => {

    switch (key) {
      case "24h":
        setDays("24h");
        break;
      case "7d":
        setDays("7d")
        break;
      case "14d":
        setDays("14d")
        break;
      case "30d":
        setDays("30d")
        break;
      case "60d":
        setDays("60d")
        break;
      case "200d":
        setDays("200d")
        break;
      case "1y":
        setDays("365d")
        break;
      case "max":
        setDays("max")
        break;

      default:
        setDays("24h")
        break;
    }

  }

  const currencySymbol = currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const parms = useParams();

  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${parms.id}`);
        const { data: chartData } = await axios.get(`${server}/coins/${parms.id}/market_chart?vs_currency=${currency}&days=${days}'`);

        setCoin(data);
        setChartArray(chartData.prices);
        console.log(chartData.prices);
        setLoading(false);
      } catch (error) {
        seterror(true);
        setLoading(false);
      }
    };
    fetchExchanges();
  }, [parms.id, currency, days])

  if (error) {
    return <Error message="Error while fetching coin" />
  }

  return (
    <Container maxW={'container.xl'}>
      {
        loading ? <Loader /> : <>

          {/* <HStack h={"50vh"} justifyContent={"center"} >
            <Charts />
            </HStack> */}

          <Box width={"full"} borderWidth={1}>
            <Charts arr={chartArray} currency={currencySymbol} days={days} />
          </Box>

          <HStack p={4} wrap={"wrap"} >
            {
              btns.map((i) => {
                return <Button key={i} onClick={() => switchChart(i)} >{i}</Button>
              })
            }
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={8} >
            <HStack spacing={"4"} >
              <Radio value='inr' >INR</Radio>
              <Radio value='usd' >USD</Radio>
              <Radio value='eur' >EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"} >
            <Text fontSize={"small"} alignSelf={"center"} opacity={.7} >
              Last Updated On {coin.market_data.last_updated}
            </Text>

            <Image src={coin.image.large} w={16} h={16} objectFit={"contain"} />

            <Stat >
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? "increase" : "decrease"} />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge fontSize={"2xl"} color={"white"} bgColor={"blackAlpha.900"} > {`#${coin.market_cap_rank}`} </Badge>

            <Custombar high={`${currencySymbol}${coin.market_data.high_24h[currency]}`} low={`${currencySymbol}${coin.market_data.low_24h[currency]}`} />

            <Box w={'full'} p={4} >
              <Item title={"Max Supply"} value={coin.market_data.max_supply} ></Item>
              <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply} ></Item>
              <Item title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`} ></Item>
              <Item title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`} ></Item>
              <Item title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`} ></Item>
            </Box>

          </VStack>
        </>
      }
    </Container>

  )
}

const Item = ({ title, value }) => {
  return (
    <HStack w={'full'} justifyContent={"space-between"} my={4} >
      <Text letterSpacing={"widest"} fontFamily={"Bebas Neue"} >{title}</Text>
      <Text>{value}</Text>
    </HStack>
  );
}

const Custombar = ({ high, low }) => {
  return (
    <VStack w={"full"} >
      <Progress value={50} colorScheme="teal" w={"full"} />
      <HStack w={"full"} justifyContent={"space-between"} >
        <Badge children={low} colorScheme="red" />
        <Text fontSize={"sm"} >24H Range</Text>
        <Badge children={high} colorScheme="green" />
      </HStack>

    </VStack>
  );

}

export default CoinDetails