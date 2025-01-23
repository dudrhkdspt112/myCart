import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Routing from './components/Routing/Routing'
import { jwtDecode } from 'jwt-decode'

function App() {
 
    const [user,setUser] = useState(null);
    
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
		<Navbar user={user}/>
        <main>
            <Routing/>
        </main>
	</div>
  )
}

export default App
