import Blockie from "../Blockie";
import { SaleType } from "../../../const";
import React from "react";
import { useTranslation } from "react-i18next";
import Clock from "../Clock";
import { navigate } from "@reach/router";

export default function AuctionItem({ item, onImgLoad, height }: { item: any, onImgLoad: any, height: any }) {
	const theme = false;
	const { nft, ...sale } = item;
	const img = React.useRef(null);
	const { t } = useTranslation();

	if (!nft) {
		return <div>Loading...</div>;
	}

	function viewDetail() {
		navigate(`/item/${nft.id}`);
	}

	return (
		<div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4 auction__card" style={{ width: "100%" }}>
			<div className={`nft__item m-0 ${theme ? 'nft__item-dark' : 'nft__item-light'}`}>
				{sale.saleType === SaleType.AUCTION &&
					<div className="de_countdown">
						<Clock deadline={new Date(sale.endTime * 1000)} />
					</div>
				}
				<div className="author_list_pp">
					<span>
						<Blockie address={sale.seller?.address} scale={5} />
					</span>
				</div>
				<div className="nft__item_wrap" style={{ height: `${height}px` }} onClick={() => viewDetail()}>
					<span className="image_card">
						{nft?.fileType === "image" ?
							<img onLoad={onImgLoad} src={nft?.image} className="lazy nft__item_preview" alt="" ref={img} />
							: nft?.fileType === "video" ?
								<video width="100%" height="" controls src={nft?.image}
									onLoad={onImgLoad}>
								</video>
								: nft?.fileType === "audio" ? <audio style={{ width: '100%' }} controls muted>
									<source src={nft?.image} type={nft?.originType} />
								</audio>
									: <img onLoad={onImgLoad} src={nft?.image} className="lazy nft__item_preview" alt=""
										ref={img} />
						}
					</span>
				</div>
				<div className="nft__item_info" onClick={() => viewDetail()}>
					<span>
						<h4
							className={`nonwrap_text ${theme ? 'nft__item__dark-text-color' : ''}`}>{nft.title || nft.name}</h4>
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
						<span>{t('nft.supply')}: {sale?.quantity} / {nft.supply}</span>
						{/*<span><i className={`fas fa-heart mr-3 ${nft?.get('like')?.includes(walletAddress) ? 'heart_like' : ''}`}*/}
						{/*				 onClick={handleLikeClick}></i>{likes}</span>*/}
					</div>
				</div>
			</div>
		</div>
	)
}