const Pet = require('../Model/PetModel');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const postPetRequest = async (req, res) => {
  try {
    const { name, age, area, justification, email, phone, type, status, location, posterName, daysInLocation } = req.body;
    const { filename } = req.file;

    const petData = {
      area,
      email,
      phone,
      type,
      filename,
      location ,
      daysInLocation,
      posterName,
      justification,
      status: status || 'Pending',
    };

    if (status === 'Home Pet') {
      petData.name = name;
      petData.age = age;
      petData.type = type;
      petData.location = location;
      petData.justification = justification;
    } else if (status === 'Homeless Pet') {
      petData.posterName = posterName;
      petData.daysInLocation = daysInLocation;
      petData.location = location;
    }

    const pet = await Pet.create(petData);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Pet Submission Received - PetAdopt',
      text: `Dear ${status === 'Home Pet' ? name : posterName},\n\nThank you for submitting your pet to PawFinds.\n\nWe have received your request, and our admin team is reviewing it. Once approved, your listing will be live on our platform.\n\nWe appreciate your patience and will notify you once your pet's listing is live.\n\nBest regards,\nThe PawFinds Team`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending submission email:', error);
    }

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const approveRequest = async (req, res) => {
  try {
    const id = req.params.id;
    const { email, phone, status } = req.body;
    const pet = await Pet.findByIdAndUpdate(id, { email, phone, status }, { new: true });

    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: pet.email,
      subject: 'Your Pet is Now Live on PetAdopt!',
      text: `Dear ${pet.status === 'Home Pet' ? pet.name : pet.posterName} Owner,\n\nGreat news! Your pet has been approved and is now live on the PawFinds platform.\n\nPet lovers in our community can now view and adopt your pet. Thank you for contributing to our community.\n\nBest regards,\nThe PawFinds Team`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending approval email:', error);
    }

    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const allPets = async (reqStatus, req, res) => {
  try {
    const data = await Pet.find({ status: reqStatus }).sort({ updatedAt: -1 });
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(200).json({ error: 'No data found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const pet = await Pet.findByIdAndDelete(id);
    if (!pet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    const filePath = path.join(__dirname, '../images', pet.filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: pet.email,
      subject: 'Pet Submission Removed - PetAdopt',
      text: `Dear ${pet.status === 'HomePet' ? pet.name : pet.posterName},\n\nWe wanted to inform you that your pet submission has been removed from the Petadopt platform.\n\nIf you have any questions, please reach out to us.\n\nBest regards,\nThe PetAdopt Team`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error('Error sending removal email:', error);
    }

    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  postPetRequest,
  approveRequest,
  deletePost,
  allPets,
};
