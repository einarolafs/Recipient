import React, { Component } from 'react';
import http from '../Services/http';
import { SelectField, MenuItem,} from 'material-ui';

export default class Countries extends React.Component {
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
            floatingLabelFixed={true}
            errorText={this.props.error ? this.props.error : ''}
            value={this.state.value}
            name={this.props.name ? this.props.name : ''}
            onChange={this.handleChange}
            style={this.props.style}
          >
        {this.menuItems(this.state.countries)}
      </SelectField>
      )
    }
  }