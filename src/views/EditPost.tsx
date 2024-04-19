import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, editPostById, deletePostById } from '../lib/apiWrapper';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import  Button  from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { CategoryType, PostFormDataType, UserType } from '../types';

type EditPostProps = {
    flashMessage: (message:string, category:CategoryType) => void,
    currentUser: UserType | null
}

export default function EditPost({ flashMessage, currentUser }:EditPostProps) {
    const { postId } = useParams();
    const navigate = useNavigate()
    
    const [postToEditData, setPostToEditData] = useState<PostFormDataType>({title: '', body: ''});
    const [showModal, setShowModal] = useState(false);

    const openModal = () =>setShowModal(true)
    const closeModal= ()=> setShowModal(false)

    
    useEffect( () => {
        async function getPost(){
            let response = await getPostById(postId!)
            if (response.data){
                const post = response.data
                const currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}')
                if (currentUser?.id !== post.author.id){
                    flashMessage('You do not have permission to edit this post', 'danger');
                    navigate('/')
                } else {
                    setPostToEditData({title: post.title, body: post.body})
                }
            } else if(response.error){
                flashMessage(response.error, 'danger');
                navigate('/')
            } else {
                flashMessage("Something went wrong", 'warning')
                navigate('/')
            }
        }

        getPost()
    }, [postId, currentUser] )

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.name, event.target.value);
        setPostToEditData({...postToEditData, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editPostById(postId!, token, postToEditData)
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage( `${response.data?.title} has been updated`, 'success')
            navigate('/')
        }
    }

    const handleDeleteClick = async() => {
        const token=localStorage.getItem('token') || '';
        const response = await deletePostById(postId!, token);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(response.data!, 'primary')
            navigate('/')
        }

    }

    return (
        <>
            <Card className='my-3'>
                <Card.Body>
                    <h3 className="text-center">Create New Post</h3>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>Post Title</Form.Label>
                        <Form.Control name='title' placeholder='Enter New Post Title' value={postToEditData.title} onChange={handleInputChange} />
                        <Form.Label>Post Body</Form.Label>
                        <Form.Control as = 'textarea' name='body' placeholder='Enter New Post Body' value={postToEditData.body} onChange={handleInputChange} />
                        <Button className='mt-3 w-50' variant='success' type='submit'>Create Post</Button>
                        <Button className='mt-3 w-50' variant='danger' onClick={openModal}>Delete Post</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {postToEditData.title}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {postToEditData.title}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Close</Button>
                    <Button variant='danger' onClick={handleDeleteClick}>Delete Post</Button>
                </Modal.Footer>
            </Modal>
    </>
    )
}
