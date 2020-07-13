const Joi = require("joi");
const express = require("express");
const router = express.Router();

const customers = [
  { id: 1, name: "Sam" },
  { id: 2, name: "Steve" },
  { id: 3, name: "Esty" },
  { id: 4, name: "Becky" },
  { id: 5, name: "Jessy" },
  { id: 6, name: "Prince" },
];

router.get("/", (req, res) => {
  res.send(customers);
});

router.get("/:year/:month", (req, res) => {
  //   res.send(req.params);
  res.send(req.query);
});
router.get("/:id", (req, res) => {
  const customer = customers.find((p) => p.id === parseInt(req.params.id));
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");
  res.send(customer);
});

router.post("/", (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const customer = {
    id: customers.length + 1,
    name: req.body.name,
  };

  customers.push(customer);
  res.send(customer);
});

router.put("/:id", (req, res) => {
  // Look up the customer
  const customer = customers.find((p) => p.id === parseInt(req.params.id));
  if (!customer)
    return res.status(404).send("The customer with the given ID was not found");

  // validate the customer
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //update customer
  customer.name = req.body.name;
  res.send(customer);
});

function validateCustomer(customer) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(customer, schema);
}

module.exports = router;
