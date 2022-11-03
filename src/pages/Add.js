import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function Add() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");

  const navigate = useNavigate();
  const data = {
    name: name,
    email: email,
    gender: gender,
    status: status,
  };

  let api = 'https://gorest.co.in/public/v2/users'

  function submitForm(e) {
    e.preventDefault();

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${'dce52a6f10c52bccab439f0d26dbabe00850e95a37f8a608d464c369400cc70b'}`
    }

    axios.post(api, data, {
      headers: headers
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    navigate('/')
  }

  return (
    <div style={{
      display: 'block',
      width: 500,
      padding: 30
    }}>
      <h4>Create Post</h4>
      <Form>
        <Form.Group className="mt-3">
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter your full name" />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control

            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your your email address" />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            type="text"
            placeholder="Enter your your gender" />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            type="text"
            placeholder="Enter your your status" />
        </Form.Group>

        <Button className="mt-3 px-5" variant="primary" type="submit" onClick={submitForm}>
          Add Post
        </Button>
      </Form>
    </div>
  );
}

export default Add;
