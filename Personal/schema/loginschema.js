const mongoose = require('mongoose');

const mongschema = mongoose.Schema

const logschema = new mongschema({

    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,  
    },

  }); 

  const login = mongoose.model('login', logschema);

  module.exports = login;
