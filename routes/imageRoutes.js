const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const { authenticate } = require('../middlewares/authMiddleware');
const { upload } = require('../middlewares/uploadMiddleware');

router.post('/', authenticate, upload.single('image'), imageController.uploadImage);
router.get('/', imageController.getAllImages);
router.get('/:id', imageController.getImageById);
router.put('/:id', authenticate, imageController.updateImage);
router.delete('/:id', authenticate, imageController.deleteImage);

module.exports = router;
