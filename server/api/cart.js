const router = require('express').Router()

router.get('/', (req, res, next) => {
  // fetch the cart object from the session store
  res.json(req.session.cart);
});

router.put('/add', (req, res, next) => {
  let cart = req.session.cart, { productId } = req.body;
  cart[productId] = (cart[productId] || 0) + 1;
  res.json({ [productId]: cart[productId] });
});

router.put('/minus', (req, res, next) => {
  let cart = req.session.cart, { productId } = req.body;
  if (!cart[productId]) {
    res.status(404).json('Product Not in Cart');
  } else {
    cart[productId] = (cart[productId] > 1) ? cart[productId] - 1 : 1;
    res.json({ [productId]: cart[productId] });
  }
});

router.put('/delete', (req, res, next) => {
  let cart = req.session.cart, { productId } = req.body;
  if (!cart[productId]) {
    res.status(404).json('Product Not in Cart');
  } else {
    delete cart[productId];
    res.json(cart);
  }
});

module.exports = router;
