/*const mongoose = require('mongoose')
const schema = mongoose.Schema;

const PetSchema = new schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    justification: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Pet', PetSchema);*/
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PetSchema = new schema(
  {
    name: {
      type: String,
      required: function () {
        return this.petStatus === 'Home Pet';
      },
    },
    age: {
      type: String,
      required: function () {
        return this.petstatus === 'Home Pet';
      },
    },
    area: {
      type: String,
      required: true,
    },
    justification: {
      type: String,
      required: function () {
        return this.petStatus === 'Home Pet';
      },
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    posterName: {
      type: String,
      required: function () {
        return this.petStatus === 'Homeless Pet';
      },
    },
    daysInLocation: {
      type: String,
      required: function () {
        return this.petStatus === 'Homeless Pet';
      },
    },
    type: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pet', PetSchema);
/*const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PetSchema = new schema(
  {
    name: {
      type: String,
      required: function () {
        return this.status === 'Home Pet';
      },
    },
    age: {
      type: String,
      required: function () {
        return this.status === 'Home Pet';
      },
    },
    area: {
      type: String,
      required: true,
    },
    justification: {
      type: String,
      required: function () {
        return this.status === 'Home Pet';
      },
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (email) {
          const emailPattern = /^[a-zA-Z0-9._-]+@gmail\.com$/;
          return emailPattern.test(email);
        },
        message: 'Please provide a valid Gmail address.',
      },
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (phone) {
          const phonePattern = /^[0-9]{10}$/;
          return phonePattern.test(phone);
        },
        message: 'Please provide a valid 10-digit phone number.',
      },
    },
    posterName: {
      type: String,
      required: function () {
        return this.status === 'Homeless Pet';
      },
    },
    daysInLocation: {
      type: String,
      required: function () {
        return this.status === 'Homeless Pet';
      },
    },
    status: {
      type: String,
      required: true,},

    type: {
      type: String,
      required: true,
      enum: ['Dog', 'Cat', 'Rabbit', 'Bird', 'Fish', 'Other'],
    },
    filename: {
      type: String,
      required: true,
    },
    petstatus: {
      type: String,
      required: true,
      enum: ['Home Pet', 'Homeless Pet'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Pet', PetSchema);*/
