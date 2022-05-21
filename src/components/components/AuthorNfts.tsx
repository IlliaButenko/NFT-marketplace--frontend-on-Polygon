import SearchIcon from "@mui/icons-material/Search";
import Loading from "./Loading";
import React, { useState, useEffect } from "react";
import { NftTypeEnum } from '../../interfaces/nft.interface';
import { useTranslation } from "react-i18next";
import PhotoFilterIcon from "@mui/icons-material/PhotoFilter";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import NftCard from "./NftCard/index";
import * as nftApi from '../../apis/nft';
import * as collectionApi from '../../apis/collection';

export default function AuthorNfts({ authorId }: { authorId: string }) {
	const { t } = useTranslation();
	const [collections, setCollections] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [filter, setFilter] = useState({
		search: '',
		page: 1,
		type: NftTypeEnum.OWNED,
		collection: '',
	})
	const [searchkey, setSearch] = useState<any>('');
	const [collectionFilter, setCollectionFilter] = useState<any>();
	const [nfts, setNfts] = useState<any[]>([]);
	const [nftFilter, setNftFilter] = useState<any[]>([]);
	const [height, setHeight] = useState(300);

	const onImgLoad = (e: any) => {
		const h = e.target.height;
		if (h > 300) return
		if (height < h) {
			setHeight(h)
		}
	}
	async function fetchNfts() {
		try {
			setIsLoading(true);
			const { data } = await nftApi.listByUser(authorId, filter);
			setNfts(data);
			setNftFilter(data);
			setIsLoading(false);
		} catch (e) {
			console.log(e);
		}
	}
	useEffect(() => {
		if (authorId) {
			fetchNfts();
		}
	}, [authorId, filter]);

	useEffect(() => {
		if (authorId) {
			let arr = nftFilter;
			if (searchkey?.trim() !== '') {
				arr = nftFilter.filter(nft => nft?.nft?.name.toLowerCase().includes(searchkey?.trim().toLowerCase()));
				setNfts(arr);
			}
			else if (collectionFilter !== "all") {
				arr = arr.filter(nft => nft?.nft?.collectionId?._id === collectionFilter);
				setNfts(arr);
			} else {
				setNfts(arr);
			}

		}
	}, [searchkey, collectionFilter, filter.type]);

	async function fetchCollections() {
		try {
			setIsLoading(true);
			const { data } = await collectionApi.getByCreator(authorId);
			setCollections(data);
			// setNftFilter(data);
			setIsLoading(false);
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		if (authorId) {
			fetchCollections();
		}
	}, [authorId]);

	return (
		<>
			<div className="prf-header-container">
				<div className='prf-header-item' onClick={() => setFilter({ ...filter, type: NftTypeEnum.OWNED })}>
					<div className={"prf-header-item-top " + (filter.type == NftTypeEnum.OWNED ? '' : '')}>
						<PhotoFilterIcon className='prf-header-item-icon' />
						{t('Owned')}
						<p className="text">{(nfts && filter.type == NftTypeEnum.OWNED) && nfts.length}</p>
					</div>
					<div
						className={"prf-header-item-top " + (filter.type == NftTypeEnum.OWNED ? 'active-boder-bottom' : 'deactive-boder-bottom')} />
				</div>

				<div className='prf-header-item' onClick={() => setFilter({ ...filter, type: NftTypeEnum.INSALE })}>
					<div className={"prf-header-item-top " + (filter.type == NftTypeEnum.INSALE ? '' : '')}>
						<FormatPaintIcon className='prf-header-item-icon' />
						{t('onSale')}
						<p className="text">{(nfts && filter.type == NftTypeEnum.INSALE) && nfts.length}</p>
					</div>
					<div
						className={"prf-header-item-top " + (filter.type == NftTypeEnum.INSALE ? 'active-boder-bottom' : 'deactive-boder-bottom')} />
				</div>
			</div>

			<div className='container no-top'>
				<div className="author-filter-nft-container">
					<div className="author-filter-nft input-container">
						<SearchIcon />
						<input
							placeholder={t('placeholder.search')}
							className="filter-nft-input"
							value={searchkey}
							onChange={e => {
								// setFilter({...filter, search: e.target.value})
								setSearch(e.target.value);
							}}
						/>
						{/* <SearchIcon /> */}

					</div>

					<select className="author-filter-nft selection"
						onChange={e => setCollectionFilter(e.target.value)}>
						{/* onChange={e => setFilter({...filter, collection: e.target.value})}> */}
						<option className="author-filter-nft" value='all'>---{t('allCollection')}---</option>
						{
							collections.map(item => (
								<option className="author-filter-nft" value={item._id} key={item.address}>{item.name}</option>
							))
						}
					</select>
				</div>


				{isLoading &&
					<div className="row">
						<Loading />
					</div>
				}
				<div id='zero1' className='onStep fadeIn'>
					<div className="row">
						{nfts.map((nft, index) =>
							<NftCard type={filter.type} item={nft} height={height} onImgLoad={onImgLoad} key={index} />
						)}
					</div>
				</div>
			</div>
		</>
	)
}

