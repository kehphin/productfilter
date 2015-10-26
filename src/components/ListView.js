import React from 'react';
import ListItemView from './ListItemView';
import _ from 'underscore';

export default React.createClass({
  render() {
    return (
      <div className='product-list row'>
        {this.renderTable()}
        {this.renderEmpty()}
      </div>
    );
  },

  renderTable() {
    let rows = [];
    this.filteredProducts = this.filterProducts();

    this.filteredProducts.forEach(function(product) {
      rows.push(<ListItemView product={product} key={product.id} />);
    });

    return (
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
            <th>Weight (oz)</th>
            <th>Category</th>
            <th>Wireless</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  },

  renderEmpty() {
    if (this.filteredProducts.length === 0) {
      return <div className='empty-table'>No matching results found.</div>
    }
    return <div></div>
  },

  filterProducts() {
    let products = this.props.products;
    let properties = this.props.properties;
    const propertyId = properties[this.props.propertyId];
    const propertyValue = this.props.propertyValue;
    const operatorId = this.props.operatorId;

    // No filter applied
    if (propertyName === null || propertyValue === null || operatorId === null) {
      return products;
    }

    // Filter by operator, case insensitive
    const propertyName = propertyId.name;
    if (operatorId === 'equals') {
      return this.filterByEquals(products, propertyName, propertyValue);
    } else if (operatorId === 'greater_than') {
      return this.filterByGreaterThan(products, propertyName, propertyValue);
    } else if (operatorId === 'less_than') {
      return this.filterByLessThan(products, propertyName, propertyValue);
    } else if (operatorId === 'any') {
      return this.filterByAny(products, propertyName, propertyValue);
    } else if (operatorId === 'none') {
      return this.filterByNone(products, propertyName, propertyValue);
    } else if (operatorId === 'in') {
      return this.filterByIn(products, propertyName, propertyValue);
    } else {
      return products;
    }
  },

  filterByEquals(products, propertyName, propertyValue) {
    return _.filter(products, function(product) {
      let matchingProperty = _.find(product.properties, (property) => property.name === propertyName);
      
      return matchingProperty ? matchingProperty.value.toLowerCase() === propertyValue.toLowerCase() : false; 
    });
  },

  filterByGreaterThan(products, propertyName, propertyValue) {
    return _.filter(products, function(product) { 
      let matchingProperty = _.find(product.properties, (property) => property.name === propertyName);
      return matchingProperty ? matchingProperty.value > propertyValue : false; 
    });
  },

  filterByLessThan(products, propertyName, propertyValue) {
    return _.filter(products, function(product) { 
      let matchingProperty = _.find(product.properties, (property) => property.name === propertyName);
      return matchingProperty ? matchingProperty.value < propertyValue : false; 
    });
  },

  filterByAny(products, propertyName, propertyValue) {
    return _.filter(products, function(product) { 
      let matchingProperty = _.find(product.properties, (property) => property.name === propertyName);

      return matchingProperty ? matchingProperty.value.toLowerCase().indexOf(propertyValue.toLowerCase()) > -1 : false;
    });
  },

  filterByNone(products, propertyName, propertyValue) {
    return _.filter(products, function(product) {
      let matchingProperty = _.find(product.properties, (property) => property.name === propertyName);

      return matchingProperty ? matchingProperty.value.toLowerCase() !== propertyValue.toLowerCase() : false; 
    });
  },

  filterByIn(products, propertyName, propertyValue) {
    // Split the user input if they provided multiple search terms
    const inArray = propertyValue.split(', ').map((x) => x.toLowerCase());

    return _.filter(products, function(product) { 
      let matchingProperty = _.find(product.properties, (property) => property.name === propertyName);

      return matchingProperty ? inArray.indexOf(matchingProperty.value.toLowerCase()) > -1 : false;
    });
  }
});
