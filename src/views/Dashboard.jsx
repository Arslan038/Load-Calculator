import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";

import axios from 'axios'

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      record: [],
      project_number: '',
      project_name: '',
    }
  }

  componentDidMount() {
    const user = localStorage.getItem('loadAdmin');
      if(user === null) {
        this.props.history.push('/auth/login')
      }
      else {
        this.init(); 
      }
  }


  init() {
    const apiUrl = 'https://load-calculator.herokuapp.com/all_snow_loads';

    axios.get(apiUrl).then(result => {
      if(result.data.status === 'success') {
        this.setState({record: result.data.data})
      }
    }, (error) => {
      this.setState({ error })
    })
  }

  viewDetails(id) {
    this.props.history.push('project-details/'+id)
  }

  render() {
    const {error, record} = this.state
    if(error) {
      return (
        <h1>Error: {error.message}</h1>
      )
    }
    else {
      return (
        <>
          <div className="content">
          <h3>All Projects</h3>
            <Row>
              {record.map(row => (
                <Col md="3">
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle tag="h4" className="text-info">{row.project_name}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <button className="btn btn-success" onClick={() => this.viewDetails(row._id)}>View Project Details</button>
                  </CardBody>
                </Card>
                </Col>
              ))}
              
            </Row>
          </div>
        </>
      );
    }
  }
}

export default Dashboard;
