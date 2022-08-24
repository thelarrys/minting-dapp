import {useState} from "react";
import { ethers, BigNumber} from "ethers";
import { Box, Button, Flex, Input, Text} from '@chakra-ui/react';

import dogepunks from "./DogePunksNFT.json";

const dogepunksNFTAddress = "0x59eA3d6923324b882da4e210E17533D868D6CaF4";

const MainMint = ({accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {

        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                dogepunksNFTAddress,
                dogepunks.abi,
                signer 
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount));
                console.log('response', response);
            
            } catch(err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount -1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 3) return;
        setMintAmount(mintAmount +1);
    };

    return (
        <Flex justify="center" align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
            
            <div>  
        
            <Text fontSize="48px" textShadow="0 5px #000000">Doge Punks</Text>
            <p>It's 2078. Can the Robopunks NFT save humans 
                from destructive... 
            </p>
            </div>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={mintAmount} />
                        <button onClick={handleIncrement}>+</button>
                    </div> 
                    <button onClick={handleMint}>Mint Now</button>
                </div>
            )  :  (
                <p> You must be connected to Mint.</p>
            )}
            </Box>

            <Flex className="moving-background"></Flex>
        </Flex>

    );

};

export default MainMint;
