import { NftTypeEnum } from "../../../interfaces/nft.interface"
import NftOwned from "./Owned";
import NftOnSale from "./OnSale";
import MarketItem from "./MarketItem";
import AuctionItem from "./AuctionItem";
// import NftOnSale from "./OnSale";
// import NftCreated from "./Created";
// import MarketItem from './MarketItem';

export default function NftItem({ type, item, height, onImgLoad,  }: { type: NftTypeEnum; item: any, height: any, onImgLoad: any,  }) {
	switch (type) {
		case NftTypeEnum.OWNED:
			return <NftOwned ownership={item} height={height} onImgLoad={onImgLoad} />;
		// case NftTypeEnum.CREATED:
		// 	return <NftCreated nft={item} />;
		case NftTypeEnum.INSALE:
			return <NftOnSale item={item} height={height} onImgLoad={onImgLoad} />;
		case NftTypeEnum.MARKET:
			return <MarketItem item={item} height={height} onImgLoad={onImgLoad} />;
		case NftTypeEnum.AUCTION:
			return <AuctionItem item={item} height={height} onImgLoad={onImgLoad} />;
		default:
			return <div>Unknown NFT type</div>;
	}
}

