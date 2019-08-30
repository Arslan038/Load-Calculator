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

class SnowLoad extends React.Component {
  constructor(props) {
    super(props)

    this.initialState = {
      project_number: '',
      project_name: '',
      Is: '',
      Ss: '',
      Cb: '',
      Cw: '',
      Cs: '',
      Ca: '',
      Sr: '',
    }

    this.state = this.initialState
  }

  componentDidMount() {
    const user = localStorage.getItem('loadAdmin');
      if(user === null) {
        this.props.history.push('/auth/login')
      }
  }

  cancel() {
    this.props.history.push('/dashboard')
  }

  addSnowLoad() {
    if(this.state.project_name === '' || this.state.project_number === '' || this.state.Is === '' || this.state.Ss === '' || this.state.Cb === '' || this.state.Cw === '' || this.state.Cs === '' || this.state.Ca === '' || this.state.Sr === '') {
      console.log("All Fields Required")
    }
    else {
      axios.post('https://load-calculator.herokuapp.com/snow_load', {
        project_number: this.state.project_number,
        project_name: this.state.project_name,
        Is: this.state.Is,
        Ss: this.state.Ss,
        Cb: this.state.Cb,
        Cw: this.state.Cw,
        Cs: this.state.Cs,
        Ca: this.state.Ca,
        Sr: this.state.Sr,
      }).then(res => {
        if(res.data.status === 'success') {
          this.setState({Is: ''});
          this.setState({Ss: ''});
          this.setState({Cb: ''});
          this.setState({Cw: ''});
          this.setState({Cs: ''});
          this.setState({Ca: ''});
          this.setState({Sr: ''});
          console.log('Snow Load Added')
          this.props.history.push('/tables')
        }
      })
    }
  }

  render() {
    return (
      <>
        <div className="content mx-auto">
          <Row className="mx-auto">
            <Col md="3"/>
            <Col md="6">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Add Snow Load</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                  <Row>
                      <Col className="px-3" md="6">
                        <FormGroup>
                          <label>Project Number</label>
                          <Input
                            placeholder="Project Number"
                            type="text"
                            onChange={(text) => { this.initialState.project_number = text.target.value }}
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-3" md="6">
                        <FormGroup>
                          <label>Project Name</label>
                          <Input
                            placeholder="Project Name"
                            type="text"
                            onChange={(text) => { this.initialState.project_name = text.target.value }}
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
                            onChange={(text) => { this.initialState.Is = text.target.value }}
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
                            onChange={(text) => { this.initialState.Ss = text.target.value }}
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
                            onChange={(text) => { this.initialState.Cb = text.target.value }}
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
                            onChange={(text) => { this.initialState.Cw = text.target.value }}
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
                            onChange={(text) => { this.initialState.Cs = text.target.value }}
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
                            onChange={(text) => { this.initialState.Ca = text.target.value }}
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
                            onChange={(text) => { this.initialState.Sr = text.target.value }}
                          />
                        </FormGroup>
                      </Col>
                      
                    </Row>
                    
                    
                    <Row>
                      <Col md="6">
                      <Button
                          className="btn btn-block btn-round"
                          color="primary"
                          onClick={() => {this.addSnowLoad()}}
                        >
                          Add Snow Load
                        </Button>
                      </Col>
                      <Col md="6">
                        <Button
                          className="btn btn-block btn-round"
                          color="danger"
                          onClick={() => {this.cancel()}}
                        >
                          Cancel
                        </Button>
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

export default SnowLoad;
