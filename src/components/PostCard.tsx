import { PostType } from '../types';
import Card from 'react-bootstrap/Card';

type PostCardProps = {
    post: PostType
}

export default function PostCard({ post }: PostCardProps) {
    
    return (
        <Card className='my-3 bg-custom' text='black'>
            <Card.Header>{ post.dateCreated }</Card.Header>
            <Card.Body>
                <Card.Title>{ post.title }</Card.Title>
                <Card.Subtitle>{ post.author.username }</Card.Subtitle>
                <Card.Text>{ post.body }</Card.Text>
            </Card.Body>
        </Card>
    )
}
