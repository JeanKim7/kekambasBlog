import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import SignUp from './views/SignUp';



export default function App(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleClick = () => {
        setIsLoggedIn(!isLoggedIn);
    }

    return (
        <>
            <Navigation isLoggedIn={isLoggedIn}/>
            <Container>
                <Routes>
                    <Route path='/' element={<Home isLoggedIn={isLoggedIn} handleClick={handleClick} /> } />
                    <Route path='/signup' element={<SignUp /> } />
                </Routes>
            </Container>
        </>
    )
}