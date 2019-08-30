import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
import axios from 'axios'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.initialState = {
      email: '',
      password: ''
    }

    this.state = this.initialState
  }

  componentDidMount() {
      const user = localStorage.getItem('loadAdmin');
      if(user !== null) {
        this.props.history.push('/admin/dashboard')
      }
  }

  login() {
    if(this.state.email === '' || this.state.password === '') {
      console.log("All Fields Required")
    }
    else {
      axios.post('https://load-calculator.herokuapp.com/login', {
        email: this.state.email,
        password: this.state.password
      }).then(res => {
        if(res.data.status === 'success') {
            localStorage.setItem('loadAdmin', JSON.stringify(res.data.data));
            this.props.history.push('/admin/dashboard')
        }
      })
    }
  }

  render() {
    return (
      <>
        <div className="content mx-auto mt-5">
          <Row className="mx-auto">
            <Col md="4"/>
            <Col md="4">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5" className="text-center">Admin Login</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="px-3" md="12">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            placeholder="Email"
                            type="email"
                            onChange={(text) => { this.initialState.email = text.target.value }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-3" md="12">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            placeholder="Password"
                            type="password"
                            onChange={(text) => { this.initialState.password = text.target.value }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    
                    <Row>
                      <Col md='12'>
                      <div className="update mx-auto">
                        <Button
                          className="btn btn-block btn-round pull-right"
                          color="primary"
                          onClick={() => {this.login()}}
                        >
                          Login
                        </Button>
                      </div>
                      </Col>
                      
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Login;
