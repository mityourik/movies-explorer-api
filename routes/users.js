const express = require('express');

const router = express.Router();
const {
  getUserInfo,
  updateUserProfile,
} = require('../controllers/users');
const { updateUserProfileSchema } = require('../validationSchemas/joiValidationSchemas');

router.get('/users/me', getUserInfo);
router.patch('/users/me', updateUserProfileSchema, updateUserProfile);

module.exports = router;
