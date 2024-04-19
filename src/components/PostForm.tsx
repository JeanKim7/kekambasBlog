import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { PostFormDataType } from '../types';

type PostFormProps = {
    addNewPost: (data: PostFormDataType) => void}

export default function PostForm({ addNewPost }: PostFormProps) {
    const [newPost, setNewPost] = useState<PostFormDataType>({title: '', body: ''});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.name, event.target.value);
        setNewPost({...newPost, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addNewPost(newPost)
    }

    return (
        <Card className='my-3'>
            <Card.Body>
                <h3 className="text-center">Create New Post</h3>
                <Form onSubmit = {handleFormSubmit}>
                    <Form.Label>Post Title</Form.Label>
                    <Form.Control name='title' placeholder='Enter New Post Title' value={newPost.title} onChange={handleInputChange} />
                    <Form.Label>Post Body</Form.Label>
                    <Form.Control as = 'textarea' name='body' placeholder='Enter New Post Body' value={newPost.body} onChange={handleInputChange} />
                    <Button className='mt-3 w-100' variant='success' type='submit'>Create Post</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}