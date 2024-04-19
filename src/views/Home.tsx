import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { CategoryType, UserType, PostFormDataType, PostType } from '../types';
import { getAllPosts, createPost } from '../lib/apiWrapper';


type Sorting = {
    idAsc: (a: PostType, b:PostType) => number,
    idDesc: (a: PostType, b:PostType) => number,
    titleAsc: (a: PostType, b:PostType) => number,
    titleDesc: (a: PostType, b:PostType) => number,
}


type HomeProps = {
    isLoggedIn: boolean,
    currentUser: UserType | null,
    flashMessage: (newMessage:string, newCategory:CategoryType) => void
}

export default function Home({isLoggedIn, currentUser, flashMessage}: HomeProps) {

    const [showForm, setShowForm] = useState(false)
    const [posts, setPosts] = useState<PostType[]>([])
    const [fetchPostData, setFetchPostData] = useState(true);

    useEffect(() => {
        async function fetchData(){
            const response = await getAllPosts();
            if (response.data){
                let posts = response.data;
                posts.sort( (a, b) => (new Date(a.dateCreated) > new Date(b.dateCreated) ? -1 : 1) );
                setPosts(posts)
            }
        }

        fetchData();
    }, [fetchPostData])

    const [searchTerm, setSearchTerm] = useState('');

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const sortFunctions:Sorting = {
            idAsc: (a:PostType, b:PostType) => a.id - b.id,
            idDesc: (a:PostType, b:PostType) => b.id - a.id,
            titleAsc: (a:PostType, b:PostType) => a.title > b.title ? 1 : -1,
            titleDesc: (a:PostType, b:PostType) => b.title > a.title ? 1 : -1
        }
        const func = sortFunctions[e.target.value as keyof Sorting];  
        const newSortedArr = [...posts].sort(func);
        setPosts(newSortedArr);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const addNewPost = async (newPostData: PostFormDataType) => {
        const token = localStorage.getItem('token') || '';
        const response = await createPost(token, newPostData)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else if (response.data){
            flashMessage(`${response.data.title} has been created`, 'success')
            setShowForm(false);
            setFetchPostData(!fetchPostData)
        }
        setShowForm(false);
    }



    return (
        <>
            <h1 className="text-center">{isLoggedIn ? `Hello ${currentUser?.firstName} ${currentUser?.lastName}` : 'Welcome to the Blog' }</h1>


                <Row>
                    <Col xs={12} md={8}>
                        <Form.Control value={searchTerm} placeholder='Search Posts' onChange={handleInputChange} />
                    </Col>
                    <Col>
                        <Form.Select onChange={handleSelectChange}>
                            <option>Choose Sorting Option</option>
                            <option value="idAsc">Sort By ID ASC</option>
                            <option value="idDesc">Sort By ID DESC</option>
                            <option value="titleAsc">Sort By Title ASC</option>
                            <option value="titleDesc">Sort By Title DESC</option>
                        </Form.Select>
                    </Col>
                    {isLoggedIn && (
                    <Col>
                        <Button className='w-100' variant='success' onClick={() => setShowForm(!showForm)}>{showForm ? 'Hide Form' : 'Add Post+'}</Button>
                    </Col>)}
                </Row>
                { showForm && <PostForm addNewPost={addNewPost}/> }
                {posts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())).map( p => <PostCard key={p.id} post={p} currentUser={currentUser}/> )}
        </>
    )
}