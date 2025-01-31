import React, { useEffect, useState } from 'react'
import './ProductsList.css';
import ProductCard from './ProductCard';
import useData from '../../Hook/useData';
import ProductCardSkeleton from './ProductCardSkeleton';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Common/Pagination';


const ProductsList = () => {
	
	const [search, setSearch] = useSearchParams(); //요청주소 뒤에 쿼리스트링을 가져온다(?)이거 뒤에 부분
	const [sortBy, setSortBy] = useState(''); 
	//console.log(sortBy);
	const [sortedProducts, setSortedProducts] = useState([]); //정렬된 제품들을 배열로 정리한다.
	const category = search.get('category'); //category=값을 가져온다.
	const page = search.get('page'); //몇번째 페이지
	const searchQuery = search.get('search');
	const { data, error, isLoading } = useData(
		'/products',
		{
			params: {
				search: searchQuery,
				category, //category: category와 같다.
				page,
			},
		},
		[searchQuery ,category, page]
	); 
	const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];
	const handlePageChange = (page) => {
		//기존에 검색한 카테고리가 있으면 유지하면서 페이지만 업데이트
		const currentParams = Object.fromEntries([...search]);
		setSearch({ ...currentParams, page: page });
	}

	useEffect(() => {
		if(data && data.products) {
			const products = [...data.products]; //넘어온 데이터들을 배열로 복사한다.

			if(sortBy === 'price desc') {
				setSortedProducts(products.sort((a, b) => b.price - a.price));
			} else if (sortBy === 'price asc') {
				setSortedProducts(products.sort((a, b) => a.price - b.price));
			} else if (sortBy === 'rate desc') {
				setSortedProducts(products.sort((a, b) => b.reviews.rate - a.reviews.rate));
			} else if (sortBy === 'rate asc') {
				setSortedProducts(products.sort((a, b) => a.reviews.rate - b.reviews.rate));
			} else {
				setSortedProducts(products);
			}
		}
	}, [sortBy, data]);

	return (
		<section className='products_list_section'>
			<header className='align_center products_list_header'>
				<h2>상품목록</h2>
				<select onChange={(e) => setSortBy(e.target.value)} name='sort' id='' className='products_sorting'>
					<option value=''>정렬방법</option>
					<option value='price desc'>가격높은순</option>
					<option value='price asc'>가격낮은순</option>
					<option value='rate desc'>평점높은순</option>
					<option value='rate asc'>평점낮은순</option>
				</select>
			</header>

			<div className="products_list">
				{error && <em className="form_error">{error}</em>}
				{isLoading && skeletons.map((n) => <ProductCardSkeleton key={n} />)}
				{sortedProducts &&
				!isLoading &&
				sortedProducts.map((product) => (
					<ProductCard key={product._id} product={product} />
				))}
			</div>
			{/* 페이지네이션 넣기 */}
			{data && (
				<Pagination
				total={data.totalProducts}
				perPage={8}
				onClick={handlePageChange}
				currentPage={page}
				/>
			)}	
		</section>
	)
}

export default ProductsList