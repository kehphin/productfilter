import React from 'react';
import _ from 'underscore';

export default React.createClass({
  getInitialState() {
    return {
      propertyType: 'string',
      propertyId: 0,
      propertyValue: '',
      operatorId: 'equals'
    }
  },

  render() {
    return (
      <div className='row'>
        <div className='listview center-block'>
          <form className='form-inline'>
            <div className='filter-group form-group'>
              <label>Filter By:</label>
              {this.renderProperty()}
            </div>
            <div className='filter-group form-group'>
              <label>that</label>
              {this.renderOperator()}
              <input type='text' className='form-control' placeholder='Value' value={this.state.propertyValue} onChange={this.updatePropertyValue}/>
            </div>
            <button type='submit' className='btn btn-primary' onClick={this.setFilter}>Filter</button>
            {this.renderInfo()}
          </form>
        </div>
      </div>
    );
  },

  renderInfo() {
    // If `in` is selected, provide more info about the ability to add multiple search terms
    if (this.state.operatorId === 'in') {
      return <div className='filter-info'>For multiple values, separate by comma and space. Ex. red, blue</div>
    }
    return <div></div>
  },

  renderProperty() {
    return (
      <select id='propertySelect' className='form-control' onChange={this.onPropertyChange} value={this.state.propertyId}>
        {this.props.properties.map(function(propertyObj) {
          return <option value={propertyObj.id} key={propertyObj.id}>{propertyObj.name}</option>;
        })}
      </select>
    );
  },

  renderOperator() {
    return (
      // This dropdown is dependent on the type of the property, which was calculated in the parent and passed to here
      <select id='operatorSelect' className='form-control' onChange={this.onOperatorChange} value={this.state.operatorId}>
        {this.props.propertyTypeOperators[this.state.propertyType].map(function(operatorObj) {
          return <option value={operatorObj.id} key={operatorObj.id}>{operatorObj.text}</option>;
        })}
      </select>
    );
  },

  onPropertyChange(event) {
    const propertyId = event.target.value;
    const propertyType = this.props.properties[propertyId].type;

    // If the changed property doesn't have the currently selected operator, we reset it to 'equals'
    let keepProperty = _.some(this.props.propertyTypeOperators[propertyType], (operator) => operator.id === this.state.operatorId);
    let operatorId = this.state.operatorId;
    if (!keepProperty) { operatorId = 'equals' };

    this.setState({ propertyId, propertyType, operatorId });
  },

  updatePropertyValue(event) {
    this.setState({
      propertyValue: event.target.value
    });
  },

  onOperatorChange(event) {
    this.setState({ 
      operatorId: event.target.value
    });
  },

  setFilter() {
    this.props.setFilter(this.state.propertyId, this.state.propertyValue, this.state.operatorId);
  }
});
