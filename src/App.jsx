import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import { jwtDecode } from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { addToCartAPI, getCartAPI } from './services/cartServices'
import { toast, ToastContainer } from 'react-toastify'
import UserContext from './contexts/UserContext'
import CartContext from './contexts/CartContext'

//만약에 토큰이 있으면 axios 설절에 추가됨
setAuthToken(localStorage.getItem('token'));

function App() {
 
    const [user,setUser] = useState(null);
    const [cart, setCart] = useState([]); //장바구니 담기위해 배열로
    const addToCart = (product, quantity) => {
		const updatedCart = [...cart];
		const productIndex = updatedCart.findIndex(
			(item) => item.product._id === product._id
		);
		if (productIndex === -1) {
			updatedCart.push({ product, quantity});
		} else {
			updatedCart[productIndex].quantity += quantity;
		}
		setCart(updatedCart);

        addToCartAPI(product._id, quantity)
			.then((res) => {
				toast.success('상품 추가 성공~!');
			})
			.catch((err) => {
				toast.error(' 상품 추가에 실패했다고?!');
			});
	};
    
    const removeFromCart = (id) => {
        const oldCart = [...cart];
		const newCart = oldCart.filter((item) => item.product._id !== id);
		setCart(newCart);
    }

    //서버에서 장바구니 정보 가져옴
    const getCart = () => {
		getCartAPI()
			.then((res) => {
				setCart(res.data);
			})
			.catch((err) => {
				toast.error('카트 가져오기에 실패했습니다.');
			});
	};
    useEffect(() => {
        if(user) getCart();
    }, [user]);


    useEffect(() => {
        try {
            const jwt = localStorage.getItem("token");
            const jwtUser = jwtDecode(jwt);
            if(Date.now() >= jwtUser.exp * 1000) {
                localStorage.removeItem('token');
                location.reload(); //새로고침
            } else {
                setUser(jwtUser);
            }
        } catch(err) {} //토큰이 없을 경우 그냥 아무것도 안함
    }, []);

  return (
    <UserContext.Provider value={user}>
        <CartContext.Provider value={{cart, addToCart, removeFromCart}}>   
            <div className='app'>
                <Navbar user={user} cartCount={cart.length}/>
                <main>
                    <ToastContainer position='bottom-right'/>
                    <Routing/>
                </main>
            </div>
        </CartContext.Provider>     
    </UserContext.Provider>    
  )
}

export default App
