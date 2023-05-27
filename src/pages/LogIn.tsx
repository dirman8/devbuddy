import { useAuth } from "@/utils/lib/AuthUserProvider";
import { useRouter } from "next/router";
import { useState } from "react"
import Link from "next/link";
import {Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert} from 'reactstrap';

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const {signInWithEmailAndPassword} = useAuth();

  
const onSubmit = event => {
  event.preventDefault();
  setError(null);
  signInWithEmailAndPassword(email, password)
  .then(authUser => {
    router.push("/LoggedIn")
  })
  .catch(error => {
    setError(error.message)
  })
}

  return (
    <div className="h-screen flex items-center justify-center" style={{ padding: '40px 0px'}}>
      <div className="border-4 border-gray-400 p-8">
      <Row style={{maxWidth: '400px', margin: 'auto'}}>
        <Col>
          <Form onSubmit={onSubmit}>
          { error && <Alert color="danger">{error}</Alert>}
            <FormGroup row>
              <Label for="loginEmail" sm={4}>Email</Label>
              <Col sm={8}>
                <Input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="loginEmail"
                  placeholder="Email" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="loginPassword" sm={4}>Password</Label>
              <Col sm={8}>
                <Input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="loginPassword"
                  placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup row>
             <Col className="text-center">
               <Button type="submit" >Login</Button>
             </Col>
           </FormGroup>
           <FormGroup row>
            <Col className="mt-6">
              No account? 
              <Link href="/signUp">Create one</Link>
            </Col>
          </FormGroup>
          </Form>
        </Col>
      </Row>
      </div>
    </div>
  )
}

export default LogIn