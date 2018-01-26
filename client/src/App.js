import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {RaisedButton,TextField, Divider} from 'material-ui';

class DeliveryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

    for(let input in this.state.input.recipient) {
      if(this.state.input.recipient[input] === '') {
        newState.errors.input.recipient[input] = true;
      } else {
        newState.errors.input.recipient[input] = false;
      }
    }

    this.setState(newState);
    console.log(this.state)


  }

  handleChange (event) {
    const name = event.target.name;
    const value = event.target.value;

    let newState = {...this.state};
    newState.input.recipient[name] = value;

    this.setState(newState);
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} 
      onChange={(event) => this.handleChange(event)}>
        <TextField 
          floatingLabelText="Recipient Name"
          hintText=""
          name="name"
          errorText=""
          value={this.state.input.recipient.name}
        />
        <TextField 
          floatingLabelText="Recipient Street"
          hintText=""
          name="street"
          value={this.state.input.recipient.street}
        />
        <TextField 
          floatingLabelText="Recipient City"
          hintText=""
          name="city"
          value={this.state.input.recipient.city}
        />
        <TextField 
          floatingLabelText="Recipient Country"
          hintText=""
          name="country"
          value={this.state.input.recipient.country}
        />
        <TextField 
          floatingLabelText="Recipient Zipcode"
          hintText=""
          type="number"
          name="zipcode"
          value={this.state.input.recipient.zipcode}
        />
        <TextField 
          floatingLabelText="Recipient Phone"
          hintText=""
          type="number"
          name="phone"
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
