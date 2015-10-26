import React from 'react';
import { expect } from 'chai';
import sd from 'skin-deep';
import testUtils from 'react-addons-test-utils';
import ListView from '../../src/components/ListView';
import ListItemView from '../../src/components/ListItemView';

describe('ListView', () => {
  let products = [{
    id: 0, 
    properties: [{
      name: 'Product Name', 
      value: 'Headphones'
    },
    {
      name: 'weight (oz)',
      value: 3
    }]
  }];

  let properties = [{
    id: 0,
    name: 'Product Name',
    type: 'string'
  },
  {
    id: 2,
    name: 'weight (oz)',
    type: 'number'
  }]

  it('should display a ListItem when then product value equals inputted value', () => {
    let propertyValue = 'Headphones';
    let operatorId = 'equals';
    let propertyId = 0;
    
    let tree = sd.shallowRender(<ListView 
      products={products}
      properties={properties}
      propertyId={propertyId} 
      propertyValue={propertyValue}
      operatorId={operatorId}/>);
    let vdom = tree.getRenderOutput();

    let item = tree.findNode("ListItemView");
    expect(item).to.have.property('type', ListItemView);
  });

  it('should not display a ListItem when then product value does not equal inputted value', () => {
    let propertyValue = 'Xeadphones';
    let operatorId = 'equals';
    let propertyId = 0;
    
    let tree = sd.shallowRender(<ListView 
      products={products}
      properties={properties}
      propertyId={propertyId} 
      propertyValue={propertyValue}
      operatorId={operatorId}/>);
    let vdom = tree.getRenderOutput();

    let item = tree.findNode("ListItemView");
    expect(item).to.eql(false);
  });
});
