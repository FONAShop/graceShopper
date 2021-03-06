
import React from 'react'
import { connect } from 'react-redux';
import { addProductToCart } from '../store';
import { Card, Image, Button, Icon, Label } from 'semantic-ui-react';

const Product = ({ product, addButtonClick }) => (
  <Card color="green" style={{ margin: '2em'}}>
    <a href={`product/${product.id}`}><Image rounded height="300" src={product.imgUrl} /></a>
    <Card.Content>
    <Card.Header>{product.name}</Card.Header>
    <Card.Meta>
    { product.categories.map((category, idx) => {
      return (
        <Button basic color="brown" size="mini" key={idx} style={{ padding: '0.4em 0.6em 0.6em', margin: '0em 0.3em'}}>{category}</Button>
      );
    })}
    </Card.Meta>
    <Label tag color="green" style={{ marginTop: '0.5em'}}>{'$' + product.price}</Label>
    <Button dataname={product.id} onClick={addButtonClick} floated="right" size="small">
      <Icon dataname={product.id} name="add to cart" />
    </Button>
    </Card.Content>
  </Card>
)

const mapDispatch = dispatch => {
  return {
    addButtonClick(event) {
      const productId = { productId: event.target.getAttribute('dataname') };
      dispatch(addProductToCart(productId));
    }
  };
};

export default connect(null, mapDispatch)(Product);
