import React, { Component } from 'react';
import './App.css';
import http from './Services/http'
import Countries from './Components/countries'
import DialogBox from './Components/dialogBox'
import { RaisedButton, TextField, DatePicker} from 'material-ui';


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
          phone:"",
        },
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
            phone:"",
          },
        },
      },
      warning: {
        message: <span>Could not submit your request, please try again later</span>,
        open: false,
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    
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
    .then(data => {
      this.props.onChange(true);})
    .catch(error => {
      const newState = {...this.state};
      newState.warning.open = true;
      newState.warning.message = 
        error.error ? <span>{error.error}</span> : this.state.warning.message
      this.setState(newState);
    })

  }

  handleChange (event, date) {
    const name = event ? event.target.name : 'delivery_at';
    const value = event ? event.target.value : date;

    let newState = {...this.state};
    if(name === 'delivery_at') newState.input[name] = value;
    else newState.input.recipient[name] = value;
    this.setState(newState);
  }

  closeDialog() {
    let newState = {...this.state};
    newState.warning.open = false
    this.setState(newState);
  }

  inputStyle = {
    margin: '0 15px'
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} 
      onChange={(event) => this.handleChange(event)}>
        <DatePicker 
          floatingLabelText="Delivery date" 
          floatingLabelFixed={true}
          errorText={this.state.errors.input.delivery_at}
          name="delivery_at"
          value={this.state.input.delivery_at}
          onChange={this.handleChange}
          style={this.inputStyle}
        />
        <div>
          <TextField 
            floatingLabelText="Recipient Name"
            floatingLabelFixed={true}
            name="name"
            errorText={this.state.errors.input.recipient.name}
            value={this.state.input.recipient.name}
            style={this.inputStyle}
          />
          <TextField 
            floatingLabelText="Recipient Street"
            name="street"
            floatingLabelFixed={true}
            errorText={this.state.errors.input.recipient.street}
            value={this.state.input.recipient.street}
            style={this.inputStyle}
          />
        </div>
        <div>
          <TextField 
            floatingLabelText="Recipient City"
            floatingLabelFixed={true}
            name="city"
            errorText={this.state.errors.input.recipient.city}
            value={this.state.input.recipient.city}
            className="City"
            style={this.inputStyle}
          />
          <TextField 
            floatingLabelText="Recipient Zipcode"
            floatingLabelFixed={true}
            type="number"
            name="zipcode"
            errorText={this.state.errors.input.recipient.zipcode}
            value={this.state.input.recipient.zipcode}
            style={{...this.inputStyle,width:'150px'}}
          />
          <Countries 
            label="Recipient Country" 
            name="country"
            error={this.state.errors.input.recipient.country}
            value={this.state.input.recipient.country}
            onChange={this.handleChange}
            className="country"
            style={this.inputStyle}
            />
        </div>
        <TextField 
          floatingLabelText="Recipient Phone"
          floatingLabelFixed={true}
          hintText=""
          type="number"
          name="phone"
          errorText={this.state.errors.input.recipient.phone}
          value={this.state.input.recipient.phone}
          style={this.inputStyle}
        />
        <RaisedButton 
          type="submit" 
          label="Submit" 
          style={{...this.inputStyle, marginTop:'30px', float:'right'}} />
        
        <DialogBox 
          open={this.state.warning.open} 
          message={this.state.warning.message}
          onClick={this.closeDialog}

        />
      </form>

    );
  }
}

const Deliverd = () => ( 
  <div className="submitted">
    <h1>Task sent</h1>
    <p>Your task has been submitted and will be processed soon</p>
  </div>
)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted:false
    }
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    let newState = {...this.state};
    newState.submitted = true;
    this.setState(newState);
  }

  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Send to Recipient</h1>
        </header>
        {this.state.submitted ? <Deliverd /> : <DeliveryForm onChange={this.handleChange} />}
      </div>
    );
  }
}

export default App;
