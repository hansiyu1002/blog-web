import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import {useCreateBlogMutation} from '../services/api';
import { useEditor, EditorContent } from '@tiptap/react';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

function NewBlog() {
    const [title, setTitle] = useState("");
    const [ createBlog ] = useCreateBlogMutation();

    const editor = useEditor({
        extensions: [
            Document,
            Paragraph,
            Text
        ],
        autofocus: true,
        editable: true
    });

    function handlePublish(e) {
        e.preventDefault();
        const content = editor.getHTML();
        console.log(content);
        if(!title || !content) {
            return alert("Title and content required");
        }
        createBlog({ title, content })
    }

    return (
        <Container>
            <Form onSubmit={handlePublish}>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                </Form.Group>

                <EditorContent editor={editor} />

                <br />
                <Button variant="primary" type="submit">
                    Create Blog
                </Button>
            </Form>
        </Container>
    );
}

export default NewBlog;