import {ethers} from 'ethers';

export async function createLazyBuySig(signer, {collectionAddress, amount, creator, price, uri}) {
    console.log({collectionAddress, amount, creator, price, uri});
    return signer.signMessage(
        ethers.utils.arrayify(
            ethers.utils.keccak256(
                ethers.utils.defaultAbiCoder.encode(
                    ['address', 'uint256', 'address', 'uint256', 'string'],
                    [collectionAddress, amount, creator, price, uri]
                )
            )
        )
    );
}

// function bidLazy(address _tokenAddress, uint256 _amount, address _creator, uint256 _minBid, uint256 _endTime, string calldata _uri, uint256 _auctionId, bytes calldata _signature)
export async function createLazyBidSig(signer, {collectionAddress, amount, creator, minBid, endTime, uri, auctionId}) {
    return signer.signMessage(
        ethers.utils.arrayify(
            ethers.utils.keccak256(
                ethers.utils.defaultAbiCoder.encode(
                    ['address', 'uint256', 'address', 'uint256', 'uint256', 'string', 'uint256'],
                    [collectionAddress, amount, creator, minBid, endTime, uri, auctionId]
                )
            )
        )
    );
}

// return unique number by timestamp and random
export function getUniqueNumber() {
    return Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 1000000);
}

// export function marketDecode(data) {
//     let rawdata = fs.readFileSync('artifacts/contracts/LazyMaketplace.sol/LazyMarketplace.json');
//     let Marketplace = JSON.parse(rawdata);
//
//     const iface = new ethers.utils.Interface(Marketplace.abi);
//     return iface.parseTransaction({ data });
// }
