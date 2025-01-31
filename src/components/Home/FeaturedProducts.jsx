import React from 'react'
import './FeaturedProducts.css';
import ProductCard from '../Products/ProductCard';
import useData from '../../Hook/useData';
import ProductCardSkeleton from '../Products/ProductCardSkeleton';

const FeaturedProducts = () => {
  
	const {data: products, error, isLoading} = useData(
		"products/featured"
	)
	const skeletons = [1, 2, 3];
	console.log(products);
	
	return (
    <section className='featured_products'>
		<h2>주요제품</h2>

		<div className='align_center featured_products_list'>
			{error && <em className='form_error'>{error}</em>}
					{isLoading && skeletons.map((n) => (
						<ProductCardSkeleton key={n} />
					))}
					{products && !isLoading &&
						products.map((product) => (
							<ProductCard key={product._id} product={product}		
							/>
						))}			
		</div>
	</section>
  )
}

export default FeaturedProducts