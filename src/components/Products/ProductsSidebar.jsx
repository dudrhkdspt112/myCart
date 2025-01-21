import React, { useEffect, useState } from 'react'
import './ProductsSidebar.css';
import LinkWithIcon from '../Navbar/LinkWithIcon';
import rocket from '../../assets/rocket.png';
import apiClient from '../../utils/api-client';

const ProductsSidebar = () => {
	
	const[categories, setCategories] = useState([]);
	const[error, setError] = useState('');
	
	useEffect(() => {
		apiClient
			.get('category')
			.then((res) => setCategories(res.data))
			.catch((err) => setError(err.meessage))
	}, []);

	return (
		<aside className='products_sidebar'>
			<h2>카테고리</h2>

			<div className='category_links'>
				{error && <em className='form_error'>{error}</em>}
				{categories &&
					categories.map((c) => (
						<LinkWithIcon
							key={c._id}
							title={c.name}
							link={`/products?category=${c.name}`}
							emoji={`http://localhost:5000/category/${c.image}`}
							sidebar={true}
						/>
					))}
			</div>
		</aside>
	)
}

export default ProductsSidebar