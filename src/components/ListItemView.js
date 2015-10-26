import React from 'react';
import _ from 'underscore';

export default React.createClass({
  render() {
    // For the sake of the example datastore, only display the categories provided
    let product = this.props.product;
    let name = _.find(product.properties, (property) => property.name === 'Product Name');
    let color = _.find(product.properties, (property) => property.name === 'color');
    let weight = _.find(product.properties, (property) => property.name === 'weight (oz)');
    let category = _.find(product.properties, (property) => property.name === 'category');
    let wireless = _.find(product.properties, (property) => property.name === 'wireless');

    return (
      <tr>
        <td>{name ? name.value : ''}</td>
        <td>{color ? color.value : ''}</td>
        <td>{weight ? weight.value : ''}</td>
        <td>{category ? category.value : ''}</td>
        <td>{wireless ? wireless.value : ''}</td>
      </tr>
    );
  }
});