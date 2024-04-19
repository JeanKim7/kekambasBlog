import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { CategoryType, UserFormDataType } from '../types'
import InputGroup from 'react-bootstrap/InputGroup';
import {useState} from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import { login } from '../lib/apiWrapper';
import { useNavigate } from 'react-router-dom';


type LoginProps = {
    flashMessage: (newMessage:string|undefined, newCategory:CategoryType|undefined) => void,
    logUserIn: () => void
}

export default function Login({flashMessage, logUserIn}: LoginProps) {
    const navigate = useNavigate();

    const [userFormData, setUserFormData] = useState<Partial<UserFormDataType>>(
        {
        
        username: '',
        password: '',

        }
    )

    const [seePassword, setSeePassword] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserFormData({...userFormData, [e.target.name]: e.target.value })
    }

    const handleFormSubmit = async (e:React.FormEvent) => {
        e.preventDefault();

        const response = await login(userFormData.username!, userFormData.password!)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            const token = response.data!.token;
            const tokenExp = response.data!.tokenExpiration;
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExp', tokenExp);
            logUserIn();
            flashMessage("You have successfully logged in", 'success');
            navigate('/')
        }
    }

    return (
        <>
        <h1 className="text-center">Login Here</h1>
        <Card>
            <Card.Body>
                <Form onSubmit = {handleFormSubmit}>
                    

                    <Form.Label htmlFor = "username">Username</Form.Label>
                    <Form.Control id='username' name= 'username' placeholder= 'Enter Username'  value={userFormData.username} onChange={handleInputChange}/>
                    
                    <Form.Label htmlFor = "password">Password</Form.Label>
                    <InputGroup>
                            <Form.Control id='password' name='password' type={!seePassword ? 'password': 'text'} placeholder='Enter Password' value={userFormData.password} onChange={handleInputChange}/>
                            <InputGroup.Text onClick={() => setSeePassword(!seePassword)}><i className="bi bi-eye"></i></InputGroup.Text>
                        </InputGroup>

                    

                    <Button type='submit' variant='outline-primary' className='w-100 mt-3' >Login</Button>    
                    
                </Form>
            </Card.Body>
        </Card>
        </>
    )
}


// password validation using regex
// function validatePassword(password: string): boolean {
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumber = /[0-9]/.test(password);
  
//     return hasUpperCase && hasLowerCase && hasNumber;
//   }