import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Signup.css';
import axios from 'axios';
import { useSignupUserMutation } from '../services/api';

function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signupUser, { isLoading, data }] = useSignupUserMutation();

    function handleSignup(e) {
        e.preventDefault();
        /*
        axios
            .post('http://localhost:3000/users/signup', { email, password })
            .then(({ data }) => console.log(data))
            .catch((err) => console.log(err))
        */
        signupUser({ email, password });
    }

    return(
        <Container>
            <Row>
                <Col md={6} className="signup_bg_container" />
                <Col md={6} className="d-flex align-items-center justify-content-center">
                    <Form className="signup_form" onSubmit={handleSignup}>
                        <h1 className="text-center">Create an account</h1>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
                        <div className="py-4">
                            <p>
                                Already have an account? <Link to="/login">Login</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup