import React, { useEffect } from 'react';
import { getUrl } from '../../../helpers/ipfs';
import * as NftAPI from '../../../apis/nft';
import ListForm from "../Form/ListForm";
import { SaleType } from "../../../const";
import Clock from "../Clock";
import Blockie from "../Blockie";
import { useTranslation } from "react-i18next";
import { navigate } from "@reach/router";
import TakeOffSale from "../Form/TakeOffSale";
import { useWeb3 } from "../../../providers/Web3Provider/provider";

export default function NftOnSale({ item, onImgLoad, height }: { item: any, onImgLoad: any, height: any }) {
	const theme = false;
	const { nft, ...sale } = item;
	const img = React.useRef(null);
	const { t } = useTranslation();
	const { user } = useWeb3();
	console.log(nft,'nft onSale');
	function viewDetail() {
		navigate(`/item/${nft.id}`);
	}

	if (!nft) {
		return <div>Loading...</div>;
	}
	return (
		<div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
			<div className="mb-4 auction__card">
				<div className={`nft__item m-0 ${theme ? 'nft__item-dark' : 'nft__item-light'}`}>
					{sale.saleType === SaleType.AUCTION &&
						<div className="de_countdown">
							<Clock deadline={new Date(sale.endTime * 1000)} />
						</div>
					}
					<div className="nft__item_wrap" style={{ height: `${height}px` }} onClick={viewDetail}>
						<span className="image_card">
							{/* {sale.isVideo
								? <video width="100%" height="" controls src={nft.image} onLoad={onImgLoad}>
								</video>
								: <img onLoad={onImgLoad} src={nft.image} className="lazy nft__item_preview" alt="" ref={img} />
							} */}

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

					<div className="nft__item_info"
					// onClick={() => navigateTo(`/ItemDetail/${nft?.get('tokenAddress')}/${nft?.get('tokenId')}`)}
					//
					>
						<span
						// onClick={() => navigateTo(`/ItemDetail/${nft?.get('tokenAddress')}/${nft?.get('tokenId')}`)}
						>
							<h4 className={`nonwrap_text ${theme ? 'nft__item__dark-text-color' : ''}`}>{nft.title ?? nft.name ?? 'Unknow'}</h4>
						</span>
						<div className="nft__item_price">
							{sale.unitPrice} MATIC<span></span>
						</div>
						<div className="nft__item_action">
							On sale: <strong>x{sale.quantity}</strong>
						</div>
						<div className={`nft__item_like ${theme ? 'nft__item__dark-text-color' : ''}`}>
							<span><i className={`fas fa-heart mr-3`}></i></span>
						</div>

						{(user?.id == sale?.seller) &&
							<TakeOffSale sale={sale} nft={nft} theme={theme} onDone={() => { }} />
						}
					</div>
				</div>
			</div>
		</div>
	)
}
