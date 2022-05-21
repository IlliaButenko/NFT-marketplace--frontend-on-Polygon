import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import DappContext from "./context";

function DappProvider(props) {
  const { web3, Moralis, user, logout } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const { ethAddress, maticAddress, chainIds, nftABI, marketABI, gasLimit } = props;

  function getUnit(chainId) {
    switch (chainId) {
      case '0x1':
      case '0x3':
        return "ETH";
      case '0x13881':
      case '0x89':
        return "MATIC";
      default:
        return "ETH";
    }
  }

  function getAddressByChainId(chainId) {
    switch (getUnit(chainId)) {
      case "ETH":
        return ethAddress;
      case "MATIC":
        return maticAddress;
      default:
        return ethAddress;
    }
  }

  useEffect(() => {
    Moralis.onChainChanged(function(chain) {
    });

    Moralis.onAccountsChanged(function(address) {
      logout();
      setWalletAddress(address[0]);
    });
  }, []);

  useEffect(
    () => setWalletAddress(user?.get("ethAddress")),
    [web3, user]
  );

  return (
    <DappContext.Provider value={{ walletAddress, chainIds: chainIds.split(','), ethAddress, maticAddress, marketABI, nftABI, getUnit, getAddressByChainId, gasLimit }}>
      {props.children}
    </DappContext.Provider>
  );
}

function useDapp() {
  const context = React.useContext(DappContext);
  if (context === undefined) {
    throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
  }
  return context;
}

export { DappProvider, useDapp };
