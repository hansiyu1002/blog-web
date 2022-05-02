import React from 'react';
import { Container } from 'react-bootstrap';
import BlogPreview from '../components/BlogPreview';
import { useGetMyBlogsQuery } from '../services/api';

// Something wrong at this page
function MyBlogs() {
    const { data: blogs } = useGetMyBlogsQuery();
    if(blogs.length === 0) {
        return (
            <div>
                <h1 className="text-center">You have no blog yet</h1>
            </div>
        );
    }
    return (
        <Container>
            <Row>
                <Col md={9} className="d-flex justify-content-center flex-wrap gap-4">
                    { blogs.map((blog, idx) => <BlogPreview key={idx} blog={blog} />) }
                </Col>
            </Row>
        </Container>
    );

    return (
        <div>
            MyBlogs
        </div>
    );
}

export default MyBlogs;