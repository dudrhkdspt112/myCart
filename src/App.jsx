import './App.css'
import CartPage from './components/Cart/CartPage'
import HomePage from './components/Home/HomePage'
import MyOrderPage from './components/MyOrder/MyOrderPage'
import Navbar from './components/Navbar/Navbar'
import ProductsPage from './components/Products/ProductsPage'
import SingleProductPage from './components/SingleProduct/SingleProductPage'

function App() {
 
  return (
    <div className='app'>
		<Navbar/>
        <main>
            {/* <HomePage/> */}
            {/* <ProductsPage/> */}
            {/* <SingleProductPage/> */}
            {/* <CartPage/> */}
            <MyOrderPage/>
        </main>
	</div>
  )
}

export default App
