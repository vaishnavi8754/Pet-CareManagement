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
        return this.petStatus === 'Home Pet';
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
    petStatus: {
      type: String,
      enum: ['Home Pet', 'Homeless Pet'],
      default: 'Home Pet', // Ensure these are the only allowed values
    },
    

  },
  { timestamps: true }
);

module.exports = mongoose.model('Pet', PetSchema);
