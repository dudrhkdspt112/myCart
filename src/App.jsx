import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import { jwtDecode } from 'jwt-decode'
import { use } from 'react'

function App() {
 
    const [user,setUser] = useState(null);
    const [cart, setCart] = useState([]); //장바구니 담기위해 배열로
    const addToCart = (product, quantity) => {
        setCart([...cart, { product, quantity }]);
    }
    
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
    <div className='app'>
		<Navbar user={user} cartCount={cart.length}/>
        <main>
            <Routing addToCart={addToCart}/>
        </main>
	</div>
  )
}

export default App
