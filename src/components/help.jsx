import React, { useEffect, useState } from "react";
import {
  Container,
  HStack,
  VStack,
  Heading,
  Text,
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import { server } from "../index";
import Loader from "./Loader";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState();
  const [currency, setCurrency] = useState("inr");

  useEffect(() => {
    const fetchCoins = async () => {
      const { data } = await axios.get(
        `${server}/coins/markets?vs_currency=${currency}&page=${page}`
      );

      setCoins(data);
      setLoader(false);
      console.log(coins);
    };
    fetchCoins();
  }, []);

  return (
    <Container maxW={"container.xl"}>
      {loader ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"}>
            {coins.map((i) => (
              <CoinCard
                id={i.id}
                name={i.name}
                img={i.image}
                rank={i.market_cap_rank}
                symbol={i.symbol}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

const CoinCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      w={"52"}
      shadow={"lg"}
      p={"8"}
      borderRadius={"lg"}
      transition={"all 0.3s"}
      m={"4"}
      css={{
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <Image src={img} h="10" w="10" objectFit={"contain"} alt="Exchange" />
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Coins;
