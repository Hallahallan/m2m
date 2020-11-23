
const mqtt = require('express');
const router = express.Router();

// Require controller module.
const boatController = require('../controllers/boatController');

/// USER ROUTES ///

// POST request for creating ticket-type
router.post('/create', boatController.createBoat);

// GET request for one ticket-type
router.get('/details/:id', boatController.getBoatById);

module.exports = router;