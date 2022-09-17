import { useAddress, useMetamask, useNFTDrop, useDisconnect } from "@thirdweb-dev/react";
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

  //Function Disconnect Wallet
  const disconnectWallet = useDisconnect();

  // Get the NFT Collection contract
  const nftDropContract = useNFTDrop(
    "0x72AA8E6804B58D21140aA550A11316167AF0f8a5"
  );

  // handle decrement and increment Button + -
  const [pricePerToken, setPricePerToken] = useState(1);
  const [inProgress, setInProgress] = useState(false);
  
  async function claimNft() {
    try {
      const tx = await nftDropContract?.claim(1);
      console.log(tx);
      //alert("NFT Claimed!");
      router.push(`/stake`);
    } catch (error) {
      console.error(error);
      alert(error);
      setInProgress(false);
    }
  }

  const startOver = ()=> {
    setInProgress(false);
    disconnectWallet();
  }
  const handleDecrement = () => {
   if(pricePerToken <= 1)return;
   setPricePerToken(pricePerToken - 1);
  }

  const handleIncrement = () => {
    if(pricePerToken >= 10)return;
    setPricePerToken(pricePerToken + 1);
   }
 
  return (
    <div className={styles.container1}>
      <h1 className={styles.h1}>Mint An NFT!</h1>

      <p className={styles.explain}>
        Here is where we use our <b>NFT Drop contract </b> to allow users to mint
        one of the NFTs that we lazy minted.
      </p>
      <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />
   
      <div className={styles.box}>
       
       <img src="logo.png"/>

      <span></span>
      </div>

      {!address ? (
        <button
          className={`${styles.mainButton} ${styles.spacerBottom}`}
          onClick={connectWithMetamask}
        >
          Connect Wallet
        </button>
      ) : (
        <>
        <Button 
         className={`${styles.mainButton} ${styles.spacerBottom}`}
         disabled={inProgress}
         onClick={disconnectWallet}>
          DISCONNECT
        </Button>

        <Button
          className={`${styles.mainButton} ${styles.spacerBottom}`}
          onClick={() => claimNft()}
        >
          Mint Now
        </Button>

        <Flex align="center" justify="center">
           <button
           className={`${styles.mainButton1} ${styles.spacerBottom}`}
           onClick={handleDecrement}
           >
            -
           </button>

           <Input 
           className={`${styles.mainButton0} ${styles.spacerBottom}`}
           type="number" 
           value={pricePerToken} 
           />

           <button 
           className={`${styles.mainButton2} ${styles.spacerBottom}`}
           onClick={handleIncrement}
           >
           +
           </button>
      </Flex>
        </>
      )}

           
    </div>
  );
};

export default Mint;

