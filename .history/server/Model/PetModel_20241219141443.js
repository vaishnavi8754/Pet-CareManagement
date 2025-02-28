const mongoose = require('mongoose');
const schema = mongoose.Schema;

const PetSchema = new schema(
  {
    petStatus: {
      type: String,
      required: true,
      enum: ['HomePet', 'HomelessPet'],
    },
    name: {
      type: String,
      required: function () {
        return this.petStatus === 'HomePet';
      },
    },
    age: {
      type: String,
      required: function () {
        return this.petStatus === 'HomePet';
      },
    },
    area: {
      type: String,
      required: true,
    },
    justification: {
      type: String,
      required: function () {
        return this.petStatus === 'HomePet';
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
        return this.petStatus === 'HomelessPet';
      },
    },
    daysInLocation: {
      type: String,
      required: function () {
        return this.petStatus === 'HomelessPet';
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
