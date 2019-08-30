import React from "react";
import Modal from 'react-awesome-modal';
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

class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      id: '',
      email: '',
      password: '',
      role: '',
      visible: false,
      newUserEmail: '',
      newUserPassword: ''
    }
  }

  openModal() {
    this.setState({
      visible : true
  });
  }

  closeModal() {
    this.setState({
      visible : false
  });
  }

  updateUser() {
    const id = this.state.id
    if(this.state.email === '' || this.state.password === '') {
      console.log('All Fields Required');
    }
    else {
      axios.post('https://load-calculator.herokuapp.com/user/'+id, {
      email: this.state.email,
      password: this.state.password,
    }).then(result => {
      if(result.data.status === 'success') {
        this.props.history.push('/dashboard')
      }
    })
    }
  }

  addUser() {
    if(this.state.newUserEmail === '' || this.state.newUserPassword === '') {
      console.log('All Fields Required');
    }
    else {
      axios.post('https://load-calculator.herokuapp.com/user', {
      email: this.state.newUserEmail,
      password: this.state.newUserPassword,
      role: 'user'
    }).then(result => {
      if(result.data.status === 'success') {
        this.setState({visible: false});
      }
    })
    }
  }

 

  componentDidMount() {
    const user = localStorage.getItem('loadAdmin');
      if(user === null) {
        this.props.history.push('/auth/login')
      }
      else {
        const userInfo = JSON.parse(user);
        this.setState({email: userInfo[0].email})
        this.setState({password: userInfo[0].password})
        this.setState({role: userInfo[0].role})
        this.setState({id: userInfo[0]._id})
      }
    //this.init();
  }
  render() {
    const {error} = this.state
    if(error) {
      return (
        <h1>Error: {error.message}</h1>
      )
    }
    else {
      return (
        <>
          <div className="content">
            <Row>
              <Col md="4"></Col>
              <Col md="4">
                <Card>
                  <CardHeader>
                    {this.state.role === 'admin' && 
                      <Button color="info" className="pull-right" onClick={() => this.openModal()}>Add User</Button>
                    }
                    <CardTitle tag="h4">Update Profile</CardTitle>
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
                            value={this.state.email}
                            onChange={(text) => { this.setState({email: text.target.value}) }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-3" md="12">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            placeholder="Password"
                            type="password"
                            value={this.state.password}
                            onChange={(text) => { this.setState({password: text.target.value}) }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Button color="info" className="btn btn-block" onClick={() => this.updateUser()}>Update</Button>
                      </Col>
                    </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            <Modal visible={this.state.visible} width="400" height="320" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <div style={{padding: '20px'}}>
                  <h3>Add User</h3>
                <Form>
                  <Row>
                      <Col className="px-3" md="12">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            placeholder="Email"
                            type="email"
                            onChange={(text) => { this.setState({newUserEmail: text.target.value}) }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-3" md="12">
                        <FormGroup>
                          <label>Password</label>
                          <Input
                            placeholder="Password"
                            type="password"
                            onChange={(text) => { this.setState({newUserPassword: text.target.value}) }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <Button color="info" className="btn btn-block" onClick={() => this.addUser()}>Add User</Button>
                      </Col>
                    </Row>
                    </Form>
                </div>
            </Modal>
          </div>
        </>
      );
    }
  }
}

export default Profile;
