import { useState } from 'react';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import { useAuth } from '../utils/lib/AuthUserProvider';
import { useRouter } from 'next/router';

const signUp = () => {
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [error, setError] = useState(null);

    const { createUserWithEmailAndPassword } = useAuth();
    const router = useRouter();

const onSubmit = event => {
    if(passwordOne === passwordTwo)
        createUserWithEmailAndPassword (email, passwordOne).then(authUser => {
            console.log("Success. The user is created in Firebase", authUser)
            router.push('./WelcomeMember')
        })
        .catch(error => {
            setError(error.message)
        });

    else
        setDefaultResultOrder("Password do not match")
    
    event.preventDefault();
}

  return (
    <div className='h-screen flex justify-center items-center'>
        <Row className='bg-gray-100 border-4 p-6'>
            <Col>
                <Form onSubmit={onSubmit}>
                    {error && <Alert color="danger">{error}</Alert>}
                    <FormGroup row className='mb-4'>
                        <Label for="signUpEmail sm={4}">Email</Label>
                        <Col sm={8}>
                            <Input 
                            type='email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            name='email'
                            id='signUpEmail'
                            placeholder='Email'
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row className='mb-4'>
                        <Label for="signUpPassword sm={4}">Password</Label>
                        <Col sm={8}>
                            <Input 
                            type='password'
                            value={passwordOne}
                            onChange={(event) => setPasswordOne(event.target.value)}
                            name='passwordOne'
                            id='signUpPassword'
                            placeholder='Password'
                            />
                        </Col>
                    </FormGroup>
                     <FormGroup row className='mb-4'>
                        <Label for="signUpPassword2 sm={4}">Confirm Password</Label>
                        <Col sm={8}>
                            <Input 
                            type='password'
                            value={passwordTwo}
                            onChange={(event) => setPasswordTwo(event.target.value)}
                            name='passwordTwo'
                            id='signUpPassword2'
                            placeholder='Password'
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col className='text-center'>
                            <Button type='submit' className='bg-blue-300 rounded shadow-lg w-40 p-2 mr-3'>Sign Up</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </Row>

    </div>
  )
}

export default signUp