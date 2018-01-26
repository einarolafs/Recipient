import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {RaisedButton,TextField, Divider, DatePicker} from 'material-ui';

function post(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then(function(response) {
    return response.json();
  });
}

class DeliveryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: {
        delivery_at:{},
        recipient:{
          name:"",
          zipcode:"",
          street:"",
          city:"",
          state:"",
          country:"",
          phone:""
        }
      },
      errors: {
        tried_to_submit:false,  
        input: {
          delivery_at:"",
          recipient:{
            name:"",
            zipcode:"",
            street:"",
            city:"",
            state:"",
            country:"",
            phone:""
          }
      },}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let newState = {...this.state}
    const message = "This field is required";

    for(let input in this.state.input.recipient) {
      if(this.state.input.recipient[input] === '') {
        newState.errors.input.recipient[input] = message;
      } else {
        newState.errors.input.recipient[input] = '';
      }
    }

    if(Object.keys(this.state.input.delivery_at).length === 0 
      && this.state.input.delivery_at.constructor === Object)
      {
        newState.errors.input.delivery_at = message;
        console.log('Missing date')
      } 
    else {
      newState.errors.input.delivery_at = '';
      console.log('NO missing date')
    }
    console.log('newState', newState)
    this.setState(newState);
    console.log(this.state);

    post('http://localhost:5000/tasks/', this.state.input)
    .then(data => console.log(data))

  }

  handleChange (event, date) {
    const name = event ? event.target.name : 'delivery_at';
    const value = event ? event.target.value : date;

    let newState = {...this.state};
    if(name === 'delivery_at') newState.input[name] = value;
    else newState.input.recipient[name] = value;
    this.setState(newState);
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} 
      onChange={(event) => this.handleChange(event)}>
        <DatePicker 
          hintText="Delivery date" 
          errorText={this.state.errors.input.delivery_at}
          name="delivery_at"
          value={this.state.input.delivery_at}
          onChange={this.handleChange}
        />
        <TextField 
          floatingLabelText="Recipient Name"
          hintText=""
          name="name"
          errorText={this.state.errors.input.recipient.name}
          value={this.state.input.recipient.name}
        />
        <TextField 
          floatingLabelText="Recipient Street"
          hintText=""
          name="street"
          errorText={this.state.errors.input.recipient.street}
          value={this.state.input.recipient.street}
        />
        <TextField 
          floatingLabelText="Recipient City"
          hintText=""
          name="city"
          errorText={this.state.errors.input.recipient.city}
          value={this.state.input.recipient.city}
        />
        <TextField 
          floatingLabelText="Recipient Country"
          hintText=""
          name="country"
          errorText={this.state.errors.input.recipient.country}
          value={this.state.input.recipient.country}
        />
        <TextField 
          floatingLabelText="Recipient Zipcode"
          hintText=""
          type="number"
          name="zipcode"
          errorText={this.state.errors.input.recipient.zipcode}
          value={this.state.input.recipient.zipcode}
        />
        <TextField 
          floatingLabelText="Recipient Phone"
          hintText=""
          type="number"
          name="phone"
          errorText={this.state.errors.input.recipient.phone}
          value={this.state.input.recipient.phone}
        />
        <Divider />
        <RaisedButton type="submit" label="Submit" />
      </form>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Send to Recipient</h1>
        </header>
        <DeliveryForm />
      </div>
    );
  }
}

export default App;
