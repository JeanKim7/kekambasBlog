import { UserType, PostType } from '../types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'

type PostCardProps = {
    post: PostType,
    currentUser: UserType | null,
}

export default function PostCard({ post, currentUser }: PostCardProps) {
    
    return (
        <Card className='my-3 bg-custom' text='black'>
            <Card.Header>{ post.dateCreated }</Card.Header>
            <Card.Body>
                <Card.Title>{ post.title }</Card.Title>
                <Card.Subtitle>{ post.author.username }</Card.Subtitle>
                <Card.Text>{ post.body }</Card.Text>
                {post.author.id === currentUser?.id && <Link to={`/edit/${post.id}`}><Button variant='primary'>Edit Post</Button></Link>}
            </Card.Body>
        </Card>
    )
}
