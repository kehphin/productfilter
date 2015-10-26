import React from 'react';
import FilterView from './FilterView';
import ListView from './ListView';
import datastore from './datastore';
import _ from 'underscore';

export default React.createClass({
  getInitialState() {
    return {
      // Start with all null so we aren't filtering anything by default
      propertyId: null,
      propertyValue: null,
      operatorId: null
    }
  },

  componentWillMount() {
    // Loads the datastore data, which is stored in this view but passed as props to children
    this.products = window.datastore.getProducts();
    this.properties = window.datastore.getProperties();
    this.operators = window.datastore.getOperators();
    this.propertyTypeOperators = this.getPropertyTypeOperators();
  },

  render() {
    return (
      <div>
        <header>
          <h1>Product Filter</h1>
        </header>
        <div className='container'>
          <FilterView setFilter={this.setFilter}
                      properties={this.properties}
                      propertyTypeOperators={this.propertyTypeOperators}/>
          <ListView products={this.products}
                    properties={this.properties}
                    propertyId={this.state.propertyId} 
                    propertyValue={this.state.propertyValue}
                    operatorId={this.state.operatorId}/>
        </div>
      </div>
    );
  },

  setFilter(propertyId, propertyValue, operatorId) {
    // Because these state variables are passed as props to the ListView, ListView will rerender 
    this.setState({propertyId, propertyValue, operatorId});
  },

  // Determines which operators each property type can support based on the specifications
  getPropertyTypeOperators() {
    let propertyTypeOperators = {};

    propertyTypeOperators.number = this.operators;

    // The string and enumerated property types don't have greater_than or less_than
    propertyTypeOperators.string = propertyTypeOperators.enumerated = _.reject(this.operators, (operatorObj) =>
      operatorObj.id === 'greater_than' || operatorObj.id === 'less_than'
    );

    alert(JSON.stringify(propertyTypeOperators));

    return propertyTypeOperators;
  }
});
