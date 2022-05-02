import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function BlogPreview({ blog }) {
    const { title, content, _id } = blog;

    return (
        <Card style={{width: "18rem"}}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    <div dangerouslySetInnerHTML={{ __html: content?.substring(0, 50) + '...' }} />
                </Card.Text>
                <LinkContainer to={`/my_blogs/${_id}`}>
                    <Button variant="primary">View</Button>
                </LinkContainer>
            </Card.Body>
        </Card>
    );
}

export default BlogPreview;