import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, CardFooter, Row, Col, FormGroup, Button, Form, Input} from "reactstrap";
import axios from "axios";
import Modal from 'react-awesome-modal';
class ProjectDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      project: [],
      error: '',
      Is: '',
      Ss: '',
      Cb: '',
      Cw: '',
      Cs: '',
      Ca: '',
      Sr: '',
    }
  }

  openModal(row) {
    console.log(row.project_number)
    this.setState({project_number: row.project_number});
    this.setState({project_name: row.project_name});
    this.setState({Is: row.Is});
    this.setState({Ss: row.Ss});
    this.setState({Cb: row.Cb});
    this.setState({Cw: row.Cw});
    this.setState({Cs: row.Cs});
    this.setState({Ca: row.Ca});
    this.setState({Sr: row.Sr});

    this.setState({
        visible : true
    });

    this.setState({
      id : row._id
  });
}

closeModal() {
    this.setState({
        visible : false
    });
}

editSnowLoad(id) {
  console.log(id)
  if(this.state.Is === '' || this.state.Ss === '' || this.state.Cb === '' || this.state.Cw === '' || this.state.Cs === '' || this.state.Ca === '' || this.state.Sr === '') {
    console.log("All Fields Required")
  }
  else {
    axios.post('https://load-calculator.herokuapp.com/snow_load/'+id, {
      project_number: this.state.project_number,
      project_name: this.state.project_name,
      Is: this.state.Is,
      Ss: this.state.Ss,
      Cb: this.state.Cb,
      Cw: this.state.Cw,
      Cs: this.state.Cs,
      Ca: this.state.Ca,
      Sr: this.state.Sr
  })
  .then(result => {
    if(result.data.status === 'success') {
      this.setState({visible: false});
      this.props.history.push('/dashboard')
    }
  })
  }
}

  getSnowLoad(row) {
    return parseFloat(row.Is) * (parseFloat(row.Ss) * parseFloat(row.Cb) * parseFloat(row.Cw) * parseFloat(row.Cs) * parseFloat(row.Ca) + parseFloat(row.Sr))
  }

  deleteSnowLoad(row) {
    axios.delete('https://load-calculator.herokuapp.com/delete_snow_load/'+row._id)
    .then(result => {
      if(result.data.status === 'success') {
        this.props.history.push('/dashboard')
      }
    })
  }

  componentDidMount() {
    const user = localStorage.getItem('loadAdmin');
      if(user === null) {
        this.props.history.push('/auth/login')
      }
      else {
        const userInfo = JSON.parse(user);
        this.setState({id: userInfo[0]._id})
        var url= window.location.href.split('/');
        const projectId = url.pop();
        this.init(projectId)
      }
  }

  init(id) {
    console.log("id"+id)
    axios.get('https://load-calculator.herokuapp.com/find_project/'+id).then(result => {
      console.log(result)
      if(result.data.status === 'success') {
        this.setState({project: result.data.data});
      }
      else {
        this.setState({ error: 'No Project Found' })
      }
    }, (error) => {
      this.setState({ error })
    })
  }
  render() {
    const {error, project} = this.state
    if(error) {
      if(this.state.error !== '') {
        return (
          <div className="content">
            <h1>{error}</h1>
          </div>
        )
      }
      else {
        return (
          <div className="content">
            <h1>Error: {error.message}</h1>
          </div>
        )
      }
      
    }
    else {
      return (
      
          <div className="content">
              <Row>
                <Col md="4"></Col>
                {project.map(row => (
                  <Col md="4">
                  <Card>
                  <CardHeader className="text-info">
                    <h5>{row.project_name}</h5>
                    <h6>{row.project_number}</h6>
                  </CardHeader>
                  <CardBody>
                    <hr/>
                    <Row>
                      <Col md="8">
                      <p>IMPORTANCE FACTOR (IS):</p>
                      </Col>
                      <Col md="4">
                      <b className="text-info">{row.Is}</b>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                      <p>GROUND SNOW LOAD (SS):</p>
                      </Col>
                      <Col md="4">
                      <b className="text-info">{row.Ss}</b>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                      <p>BASIC ROOF FACTOR (CB):</p>
                      </Col>
                      <Col md="4">
                      <b className="text-info">{row.Cb}</b>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                      <p>WIND FACTOR (CW):</p>
                      </Col>
                      <Col md="4">
                      <b className="text-info">{row.Cw}</b>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                      <p>SLOPE FACTOR (CS):</p>
                      </Col>
                      <Col md="4">
                      <b className="text-info">{row.Cs}</b>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                      <p>SHAPE FACTOR (CA):</p>
                      </Col>
                      <Col md="4">
                      <b className="text-info">{row.Ca}</b>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                      <p>RAIN LOAD (SR):</p>
                      </Col>
                      <Col md="4">
                      <b className="text-info">{row.Sr}</b>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="8">
                      <p>Snow LOAD (S):</p>
                      </Col>
                      <Col md="4">
                      <b className="text-info">{this.getSnowLoad(row)}</b>
                      </Col>
                    </Row>
                    <hr/>
                  </CardBody>
                  <CardFooter>
                    <Row>
                      <Col md="12">
                        <button className="btn btn-info pull-right" onClick={() => {this.openModal(row)}}>Edit</button>
                        <button className="btn btn-danger pull-right mr-2" onClick={() => {this.deleteSnowLoad(row)}}>Delete</button>
                      </Col>
                    </Row>
                  </CardFooter>
                  </Card>
                </Col>
                ))}
              </Row>
              <Row>
                <Col md="4"></Col>
              <Col md="4">
                <Card>
                  
                </Card>
                </Col>
              </Row>

              <Modal visible={this.state.visible} width="500" height="520" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                <div>
                  <Row className="mx-auto">
            
                <Col md="12">
                <h5 style={{paddingTop: '10px'}}>Edit Project</h5>
                  <Form>
                  <Row style={{paddingTop: '10px'}}>
                      <Col className="px-3" md="6">
                        <FormGroup>
                          <label>Project Number</label>
                          <Input
                            placeholder="Project Number"
                            type="text"
                            value={this.state.project_number}
                            onChange={(text) => { this.setState({project_number: text.target.value}) }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-3" md="6">
                        <FormGroup>
                          <label>Project Name</label>
                          <Input
                            placeholder="Project Name"
                            type="text"
                            value={this.state.project_name}
                            onChange={(text) => { this.setState({project_name: text.target.value}) }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="px-3" md="6">
                        <FormGroup>
                          <label>Importance factor (Is)</label>
                          <Input
                            placeholder="Importance Factor"
                            type="number"
                            step="0.1"
                            value={this.state.Is}
                            onChange={(text) => { this.setState({Is: text.target.value}) }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-3" md="6">
                        <FormGroup>
                          <label>Ground Snow Load (Ss)</label>
                          <Input
                            placeholder="Ground Snow Load"
                            type="number"
                            step="0.1"
                            value={this.state.Ss}
                            onChange={(text) => { this.setState({Ss: text.target.value}) }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="px-3" md="6">
                        <FormGroup>
                          <label>Basic Roof Factor (Cb)</label>
                          <Input
                            placeholder="Basic Roof Factor"
                            type="number"
                            step="0.1"
                            value={this.state.Cb}
                            onChange={(text) => { this.setState({Cb: text.target.value}) }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-3" md="6">
                        <FormGroup>
                          <label>Wind factor (Cw)</label>
                          <Input
                            placeholder="Wind Factor"
                            type="number"
                            step="0.1"
                            value={this.state.Cw}
                            onChange={(text) => { this.setState({Cw: text.target.value}) }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="px-3" md="6">
                        <FormGroup>
                          <label>Slope Factor (Cs)</label>
                          <Input
                            placeholder="Slope Factor"
                            type="number"
                            step="0.1"
                            value={this.state.Cs}
                            onChange={(text) => { this.setState({Cs: text.target.value}) }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-3" md="6">
                        <FormGroup>
                          <label>Shape factor (Ca)</label>
                          <Input
                            placeholder="Shape Factor"
                            type="number"
                            step="0.1"
                            value={this.state.Ca}
                            onChange={(text) => { this.setState({Ca: text.target.value}) }}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="px-3" md="12">
                        <FormGroup>
                          <label>Rain Load (Sr)</label>
                          <Input
                            placeholder="Rain Load"
                            type="number"
                            step="0.1"
                            value={this.state.Sr}
                            onChange={(text) => { this.setState({Sr: text.target.value}) }}
                          />
                        </FormGroup>
                      </Col>   
                    </Row>
                    <Row>
                    <Col className="px-3" md="6">
                        <FormGroup>
                        <Button
                          className="btn btn-block btn-round pull-right"
                          color="danger"
                          onClick={() => this.closeModal()}
                        >
                          Close
                        </Button>
                        </FormGroup>
                      </Col>
                    <Col className="px-3" md="6">
                        <FormGroup>
                        <Button
                          className="btn btn-block btn-round pull-right"
                          color="primary"
                          onClick={() => {this.editSnowLoad(this.state.id)}}
                        >
                          Update Snow Load
                        </Button>
                        </FormGroup>
                      </Col>

                      
                    </Row>
                  </Form>
                </Col>
              </Row>
                </div>
            </Modal>
          </div>
        
      );
    }
  }
}

export default ProjectDetails;
