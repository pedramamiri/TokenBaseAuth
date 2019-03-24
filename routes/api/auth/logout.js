const express  = require('express');
const router   = express.Router();

// Logout
router.get('/', (req, res) => {
  res.clearCookie('jwt').json({msg:'You are logged out'})
});

module.exports = router;