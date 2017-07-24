'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');

router.get('/', (req, res, next) => {
  knex('users')
    .select('id', 'firstname', 'lastname', 'username', 'phone', 'email')
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/', (req, res, next) => {
      let firstName = req.body.users.firstName;
      let lastName = req.body.users.lastName;
      let username = req.body.users.username;
      let email = req.body.users.email;
      let phone = req.body.users.phone;

  if (!firstName) {
    const err = new Error('First Name must not be blank');
    err.status = 400;
    return next(err);
  }
  if (!lastName) {
    const err = new Error('Last Name must not be blank');
    err.status = 400;
    return next(err);
  }
  if (username.length < 6) {
    const err = new Error('User Name must be 6 characters or greater');
    err.status = 400;
    return next(err);
  }

  if (/[a-zA-Z]/.test(username[0]) !== true) {
    const err = new Error('User Name must start with a letter');
    err.status = 400;
    return next(err);
  }

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(username) === true) {
    const err = new Error('User Name must not contain special characters');
      err.status = 400;
      return next(err);
  }


  if(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email) === false) {
    const err = new Error('Email must be correctly formatted');
      err.status = 400;
      return next(err);
  }

  if (!phone) {
    const err = new Error('Phone number is required');
    err.status = 400;
    return next(err);
  }
  if (phone.length < 10) {
    const err = new Error('Phone number must be at least 10 digits');
    err.status = 400;
    return next(err);
  }

  knex('users')
    .insert({
      firstname: firstName,
      lastname: lastName,
      username: username,
      email: email,
      phone: phone
    })
    .returning(['firstname', 'lastname', 'username', 'phone', 'email'])
      .then((results) => {
        res.send(results[0]);
      })
      .catch((err) => {
        next(err);
      });
  });

module.exports = router;
