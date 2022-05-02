import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetOneBlogQuery } from '../services/api';
import { Container, Row, Col } from "react-bootstrap";

function SingleBlog() {
    const { id } = useParams();
    const { data: blog } = useGetOneBlogQuery(id);

    return (
        <Container>
            <Row>
                <Col>
                    <h1>{blog.title}</h1>
                    <p>By {blog.author.email}</p>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </Col>
            </Row>
        </Container>
    );
}

export default SingleBlog;