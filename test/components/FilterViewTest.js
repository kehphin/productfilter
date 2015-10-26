import React from 'react';
import { expect } from 'chai';
import sd from 'skin-deep';
import testUtils from 'react-addons-test-utils';
import FilterView from '../../src/components/FilterView';

describe('FilterView', () => {
  let products = [{
    id: 0, 
    properties: [{
      name: 'Product Name', 
      value: 'Headphones'
    }]
  }]

  let properties = [{
    id: 0,
    name: 'Product Name',
    type: 'string'
  }]

  let propertyTypeOperators = {
    "number":[{"text":"Equals","id":"equals"}],
    "enumerated":[{"text":"Equals","id":"equals"}],
    "string":[{"text":"Equals","id":"equals"}]
  };

  let tree = sd.shallowRender(<FilterView properties={properties} propertyTypeOperators={propertyTypeOperators}/>);
  let vdom = tree.getRenderOutput();

  it('should have a div as container', () => {
    expect(vdom).to.have.property('type', 'div');
  });

  it('should have a property dropdown with a property name', () => {
    let propertyDropdown = tree.findNode('#propertySelect');
    expect(propertyDropdown).to.have.property('type', 'select');

    expect(propertyDropdown.props.children.length).to.eql(1);
  });

  it('should have a operator dropdown with a operator', () => {
    let operatorDropdown = tree.findNode('#operatorSelect');
    expect(operatorDropdown).to.have.property('type', 'select');

    expect(operatorDropdown.props.children.length).to.eql(1);
  });

  it('should have a input field', () => {
    let selectButton = tree.findNode('input');
    expect(selectButton).to.have.property('type', 'input');
  });

  it('should have a submit button', () => {
    let selectButton = tree.findNode('button');
    expect(selectButton).to.have.property('type', 'button');
  });
});
