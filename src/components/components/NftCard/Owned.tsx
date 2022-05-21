import React, { useEffect } from 'react';
import * as NftAPI from '../../../apis/nft';
import ListForm from "../Form/ListForm";
import { Menu, MenuItem, MenuButton, SubMenu } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';
import TransferForm from "../Form/TransferForm";
import BurnForm from "../Form/BurnForm";
import { navigate } from "@reach/router";
import { useWeb3 } from '../../../providers/Web3Provider/provider';

export default function NftOwned({ ownership, onImgLoad, height }: { ownership: any, onImgLoad: any, height: any }) {
	const { user, } = useWeb3();
	const { nft, ...owned } = ownership;
	const img = React.useRef(null);
	if (!nft) {
		return <div>Loading...</div>;
	}
	async function refreshUri() {
		if (!nft.image) {
			const { data } = await NftAPI.refreshUri(nft._id);
			console.log(data);
		}
	}

	function viewItem() {
		navigate('/item/' + nft.id);
	}

	if (!nft.image) {
		refreshUri();
	}
	return (
		<div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12 mb-4">
			<div className="nft__item m-0">
				<div className="nft__item_wrap" style={{ height: `${height}px` }}>
					{/* <span>
						
						<img onLoad={onImgLoad} className="lazy nft__item_preview" alt="" ref={img} src={nft.image} onClick={viewItem}/>

          </span> */}
					<span className="image_card">
						{nft?.fileType === "image" ?
							<img onLoad={onImgLoad} src={nft?.image} className="lazy nft__item_preview" alt="" ref={img} onClick={viewItem} />
							: nft?.fileType === "video" ?
								<video width="100%" height="" controls src={nft?.image}
									onLoad={onImgLoad} onClick={viewItem}>
								</video>
								: nft?.fileType === "audio" ? <audio style={{ width: '100%' }} controls muted onClick={viewItem}>
									<source src={nft?.image} type={nft?.originType} />
								</audio>
									: <img onLoad={onImgLoad} src={nft?.image} className="lazy nft__item_preview" alt=""
										ref={img} onClick={viewItem} />
						}
					</span>
				</div>
				<div className="nft__item_info">
					<span onClick={viewItem}>
						<h4> {nft.title ?? nft.name} </h4>
						<h5>Token ID: {nft.tokenId}</h5>
						<h5>Owned: {owned.amount} / {nft.supply}</h5>
					</span>
					<div className="nft__item_like">
						<i className="fa fa-heart"></i><span></span>
					</div>
					{(!nft.isLazy && nft?.creator === user?.id) &&
						< Menu menuButton={<MenuButton className="btn btn-main">
							Menu
						</MenuButton>}>
							<MenuItem>
								<ListForm tokenId={nft.tokenId} tokenAddress={nft.tokenAddress} onCreated={() => { }} nft={nft} ownership={ownership} />
							</MenuItem>
							<MenuItem>
								<TransferForm ownership={ownership} nft={nft} onDone={() => { }} />
							</MenuItem>
							<MenuItem>
								<BurnForm ownership={ownership} nft={nft} onDone={() => { }} />
							</MenuItem>
						</Menu>
					}
				</div>
			</div>
		</div >
	)
}
