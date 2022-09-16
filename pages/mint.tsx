import { useAddress, useMetamask, useNFTDrop } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import React, { useState } from 'react';
import { Button, Flex, Input } from "@chakra-ui/react";


const Mint: NextPage = () => {
  const router = useRouter();
  // Get the currently connected wallet's address
  const address = useAddress();

  // Function to connect to the user's Metamask wallet
  const connectWithMetamask = useMetamask();

  // Get the NFT Collection contract
  const nftDropContract = useNFTDrop(
    "0x72AA8E6804B58D21140aA550A11316167AF0f8a5"
  );

  // handle decrement and increment Button + -
  const [mintAmount, setMintAmount] = useState(1);

  async function claimNft() {
    try {
      const tx = await nftDropContract?.claim(1);
      console.log(tx);
      //alert("NFT Claimed!");
      router.push(`/stake`);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const handleDecrement = () => {
   if(mintAmount <= 1)return;
   setMintAmount(mintAmount - 1);
  }

  const handleIncrement = () => {
    if(mintAmount >= 10)return;
    setMintAmount(mintAmount + 1);
   }
 
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Mint An NFT!</h1>

      <p className={styles.explain}>
        Here is where we use our <b>NFT Drop</b> contract to allow users to mint
        one of the NFTs that we lazy minted.
      </p>
      <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

      {!address ? (
        <button
          className={`${styles.mainButton} ${styles.spacerBottom}`}
          onClick={connectWithMetamask}
        >
          Connect Wallet
        </button>
      ) : (
        <button
          className={`${styles.mainButton} ${styles.spacerBottom}`}
          onClick={() => claimNft()}
        >
          Claim An NFT
        </button>
      )}

      <Flex align="center" justify="center">
           <Button
           backgroundColor="#D6517D"
           borderRadius="5px"
           boxShadow="0px 2px 2px 1px #0F0F0F"
           color="white"
           cursor="pointer"
           fontFamily="inherit"
           padding="15px"
           marginTop="10px"
           onClick={handleDecrement}
           >
            -
           </Button>

           <Input 
           readOnly
           fontFamily="inherit"
           width="100px"
           height="40px"
           textAlign="center"
           paddingLeft="19px"
           marginTop="10px"
           type="number" 
           value={mintAmount} 
           />

           <Button 
           backgroundColor="#D6517D"
           borderRadius="5px"
           boxShadow="0px 2px 2px 1px #0F0F0F"
           color="white"
           cursor="pointer"
           fontFamily="inherit"
           padding="15px"
           marginTop="10px"
           onClick={handleIncrement}
           >
           +
           </Button>
      </Flex>     
    </div>
  );
};

export default Mint;

