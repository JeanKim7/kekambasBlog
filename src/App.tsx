import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import AlertMessage from './components/AlertMessage';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import SignUp from './views/SignUp';
import Login from './views/Login';
import EditPost from './views/EditPost';
import { UserType, CategoryType } from './types';
import { getMe } from './lib/apiWrapper'



export default function App(){
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') && new Date(localStorage.getItem('tokenExp')||0) > new Date() ? true : false);
    const [loggedInUser, setLoggedInUser] = useState<UserType|null>(null)


    const [message, setMessage] = useState<string|undefined>(undefined)
    const [category, setCategory] = useState<CategoryType|undefined>(undefined)


    useEffect(() => {
        console.log('This is running')
        async function getLoggedInUser(){
            if (isLoggedIn){
                const token = localStorage.getItem('token') || ''
                const response = await getMe(token);
                if (response.data){
                    setLoggedInUser(response.data);
                    localStorage.setItem('currentUser', JSON.stringify(response.data));
                } else {
                    setIsLoggedIn(false);
                    console.error(response.data);
                }
            }
        }

        getLoggedInUser()
    }, [isLoggedIn])

    const flashMessage = (newMessage:string|undefined, newCategory:CategoryType|undefined) => {
        setMessage(newMessage);
        setCategory(newCategory);
        // setTimeout(() => {
        //     if (newMessage && newCategory){
        //         flashMessage(undefined, undefined)
        //     }
        // }, 10000)
    }

    const logUserIn = () => {
        setIsLoggedIn(true)
    }

    const logUserOut = () => {
        setIsLoggedIn(false);
        setLoggedInUser(null);
        localStorage.removeItem('token')
        localStorage.removeItem('tokenExp')
        localStorage.removeItem('currentUser');
        flashMessage('You have been logged out', 'dark')
    }

    return (
        <>
            <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut}/>
            <Container>
                {message && <AlertMessage message={message} category={category} flashMessage={flashMessage}/>}
                <Routes>
                    <Route path='/' element={<Home isLoggedIn={isLoggedIn} currentUser={loggedInUser}  flashMessage={flashMessage}/> } />
                    <Route path='/signup' element={<SignUp flashMessage={flashMessage}/> } />
                    <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={logUserIn}/> } />
                    <Route path='/edit/:postId' element={<EditPost flashMessage={flashMessage} currentUser = {loggedInUser}/>} />
                </Routes>
            </Container>
        </>
    )

}