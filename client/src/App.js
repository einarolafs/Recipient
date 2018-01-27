import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {RaisedButton,TextField, DatePicker, SelectField, MenuItem} from 'material-ui';

function http(url, data) {
  let request = {
    method: data ? 'POST' : 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }
  
  if(data) request.body = JSON.stringify(data)

  return fetch(url, request)

  .then(function(response) {
    return response.json();
  });

}

class Countries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      countries: [],
    }

    this.handleChange = this.handleChange.bind(this);

    http('http://localhost:5000/countries')
      .then((data) => {
        let newState = {...this.state}
        newState.countries = data;
        this.setState(newState);
      })
  }

  handleChange(event, index, value) {
    const customEvent = {
      target: {
        name: this.props.name, 
        value:value
      }
    
    }
    this.props.onChange(customEvent);
    
    let newState = {...this.state}
    newState.value = value;
    this.setState(newState);
  }

  menuItems(countries) {
    return countries.map((country) => (
      <MenuItem value={country.id} key={country.id} primaryText={country.name} />
    ));
  }

  render() {
    return (
    <SelectField
          floatingLabelText={this.props.label ? this.props.label : ''}
          errorText={this.props.error ? this.props.error : ''}
          value={this.state.value}
          name={this.props.name ? this.props.name : ''}
          onChange={this.handleChange}
        >
      {this.menuItems(this.state.countries)}
    </SelectField>
    )
  }
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
    let error = false;
    const message = "This field is required";

    for(let input in this.state.input.recipient) {
      if(this.state.input.recipient[input] === '') {
        newState.errors.input.recipient[input] = message;
        error = true;
      } else {
        newState.errors.input.recipient[input] = '';
      }
    }

    if(Object.keys(this.state.input.delivery_at).length === 0 
      && this.state.input.delivery_at.constructor === Object)
      {
        newState.errors.input.delivery_at = message;
        error = true;
      } 
    else {
      newState.errors.input.delivery_at = '';
    }

    this.setState(newState);

    if(error)return
  

    http('http://localhost:5000/tasks/', this.state.input)
    .then(data => console.log(data))

  }

  handleChange (event, date) {
    const name = event ? event.target.name : 'delivery_at';
    const value = event ? event.target.value : date;
    console.log('parent change: ', event, date)
    console.log(name, value);

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
        <br />
        <TextField 
          floatingLabelText="Recipient Name"
          name="name"
          errorText={this.state.errors.input.recipient.name}
          value={this.state.input.recipient.name}
        />
        <br />
        <TextField 
          floatingLabelText="Recipient Street"
          name="street"
          errorText={this.state.errors.input.recipient.street}
          value={this.state.input.recipient.street}
        />
        <br />
        <TextField 
          floatingLabelText="Recipient City"
          name="city"
          errorText={this.state.errors.input.recipient.city}
          value={this.state.input.recipient.city}
        />
        <br />
        <Countries 
          label="Recipient Country" 
          name="country"
          error={this.state.errors.input.recipient.country}
          value={this.state.input.recipient.country}
          onChange={this.handleChange}
          />
        <br />
        <TextField 
          floatingLabelText="Recipient Zipcode"
          type="number"
          name="zipcode"
          errorText={this.state.errors.input.recipient.zipcode}
          value={this.state.input.recipient.zipcode}
        />
        <br />
        <TextField 
          floatingLabelText="Recipient Phone"
          hintText=""
          type="number"
          name="phone"
          errorText={this.state.errors.input.recipient.phone}
          value={this.state.input.recipient.phone}
        />
        <br />
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
          <h1 className="App-title">Send to Recipient</h1>
        </header>
        <DeliveryForm />
      </div>
    );
  }
}

export default App;
