import { Signer, ContractInterface } from "ethers";
import { Provider } from "@ethersproject/abstract-provider";
import React from "react";
import { IUser } from "../../interfaces/user.interface";

interface IWeb3Context {
  UNIT: string;
  signer: Signer | undefined;
  provider: Provider | undefined;
  user: IUser | undefined;
  chainIds: number[];
  marketAddresses: string[];
  marketABI: ContractInterface | undefined;
  collectionABI: ContractInterface | undefined;
  login: () => void;
  logout: () => void;
  isValidChain: () => boolean;
  marketAddress: string;
  chainId: number;
}

const defaultState: IWeb3Context = {
  UNIT: "ether",
  user: undefined,
  signer: undefined,
  provider: undefined,
  chainIds: [],
  marketAddresses: [],
  marketABI: undefined,
  collectionABI: undefined,
  login: () => { },
  logout: () => { },
  isValidChain: () => false,
  marketAddress: "",
  chainId: 0,
};

const Web3Context = React.createContext<IWeb3Context>(defaultState);
export default Web3Context;
