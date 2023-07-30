import { useState } from 'react';
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';
import { useAuth } from '../utils/lib/AuthUserProvider';
import { useRouter } from 'next/router';

const SignUp = () => {
    // This component has been rename from signUp to SignUp because component's name need to be Capital first
    const [email, setEmail] = useState("");
    const [passwordOne, setPasswordOne] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [error, setError] = useState(null);

    const { createUserWithEmailAndPassword, createUsersCollection } = useAuth();
    const router = useRouter();

const onSubmit = event => {
    console.log("On Submit")
    if (passwordOne === passwordTwo) {
        console.log("password same");
        
        const createUserAndCollection = async (email: string, password: string) => {
            console.log("password correct");
            try {
            await createUserWithEmailAndPassword(email, password);
            await createUsersCollection();
            console.log("Success. The user is created in Firebase");
            router.push('./WelcomeMember');
            } catch(error) {
            setError(error.message);
            }
        };

        // Call the async function
        createUserAndCollection(email, passwordOne);
    }

    else {
        console.log("Password do not match")
    }

    event.preventDefault();
}

  return (
    <div className='h-screen flex justify-center items-center'>
        <Row className='bg-gray-100 border-4 p-6'>
            <Col>
                <Form onSubmit={onSubmit}>
                    {error && <Alert color="danger">{error}</Alert>}
                    <FormGroup row className='mb-4'>
                        <Label for="signUpEmail">Email</Label>
                        <Col sm={8}>
                            <Input 
                            type='email'
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            name='signUpEmail'
                            id='signUpEmail'
                            placeholder='Email'
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row className='mb-4'>
                        <Label for="signUpPassword">Password</Label>
                        <Col sm={8}>
                            <Input 
                            type='password'
                            value={passwordOne}
                            onChange={(event) => setPasswordOne(event.target.value)}
                            name='signUpPassword'
                            id='signUpPassword'
                            placeholder='Password'
                            />
                        </Col>
                    </FormGroup>
                     <FormGroup row className='mb-4'>
                        <Label for="signUpPassword2">Confirm Password</Label>
                        <Col sm={8}>
                            <Input 
                            type='password'
                            value={passwordTwo}
                            onChange={(event) => setPasswordTwo(event.target.value)}
                            name='signUpPassword2'
                            id='signUpPassword2'
                            placeholder='Password'
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col className='text-center'>
                            <Button type='submit' className='bg-blue-300 rounded shadow-lg w-40 p-2 mr-3 my-3'>Sign Up</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </Col>
        </Row>

    </div>
  )
}

export default SignUp
