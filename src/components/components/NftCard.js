import Blockie from "../components/Blockie";
import { SaleType } from "../../const";
import React from "react";
import { useTranslation } from "react-i18next";
import Clock from "../components/Clock";
import { navigate } from "@reach/router";

export default function MarketItem({ sale, onImgLoad, height }) {
	const theme = false;
	// const { nft, ...sale } = item;
	const img = React.useRef(null);
	const { t } = useTranslation();

	if (!sale) {
		return <div>Loading...</div>;
	}

	function viewDetail() {
		navigate(`/item/${sale.id}`);
	}

	function showClock() {
		const currentTime = (new Date()).getTime() / 1000;
		if (sale.saleType === SaleType.AUCTION){
			if (sale.endTime > currentTime) {
				return <div className="de_countdown"><Clock deadline={new Date(sale.endTime * 1000)} /></div>
			}else{
				return <div className="de_countdown"><span>Auction has expired</span></div>
			}
	}
}


return (
	<div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4 auction__card">
		<div className={`nft__item m-0 ${theme ? 'nft__item-dark' : 'nft__item-light'}`}>
			{ showClock() }
			<div className="author_list_pp">
				<span>
					<Blockie address={sale.seller} scale={5} />
				</span>
			</div>
			<div className="nft__item_wrap" style={{ height: `${height}px` }} onClick={() => viewDetail()}>
				<span className="image_card">
					{sale.type === "image" ?
						<img onLoad={onImgLoad} src={sale?.image} className="lazy nft__item_preview" alt="" ref={img} />
						: sale?.type === "video" ?
							<video width="100%" height="" controls src={sale.image}
								onLoad={onImgLoad}>
							</video>
							: sale.type === "audio" ? <audio style={{ width: '100%' }} controls autoPlay muted>
								<source src={sale?.image} type={sale?.typeOrigin} />
							</audio>
								: <img onLoad={onImgLoad} src={sale?.image} className="lazy nft__item_preview" alt=""
									ref={img} />
					}
				</span>
			</div>
			<div className="nft__item_info" onClick={() => viewDetail()}>
				<span>
					<h4
						className={`nonwrap_text ${theme ? 'nft__item__dark-text-color' : ''}`}>{sale.title || sale.name}</h4>
				</span>
				<div className="nft__item_price">
					{sale.unitPrice} <span>MATIC</span>
				</div>
				<div className="nft__item_action">
					<span className={theme ? 'theme-dark-color' : ''} unselectable="on">
						{sale.saleType === SaleType.AUCTION ? t('nft.placeBid') : t('nft.buy')}
					</span>
				</div>
				<div className={`nft__item_like ${theme ? 'nft__item__dark-text-color' : ''}`}>
					<span>{t('nft.supply')}: {sale?.quantity} / {sale.supply}</span>
					{/*<span><i className={`fas fa-heart mr-3 ${nft?.get('like')?.includes(walletAddress) ? 'heart_like' : ''}`}*/}
					{/*				 onClick={handleLikeClick}></i>{likes}</span>*/}
				</div>
			</div>
		</div>
	</div>
)
}