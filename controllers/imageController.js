const Image = require('../models/Image');
const fs = require('fs');

const uploadImage = async (req, res, next) => {
  try {
    const { description, tags } = req.body;
    const imageUrl = req.file.filename;
    const image = new Image({
      imageUrl: imageUrl,
      description,
      tags: tags ? tags.split(',') : [],
      owner: req.userId
    });
    await image.save();
    res.status(201).json({ message: 'Image uploaded successfully', image });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

const getAllImages = async (req, res, next) => {
  try {
    const { tags } = req.query;
    let query = {};
    if (tags) {
      query = { tags: { $in: tags.split(',') } };
    }
    const images = await Image.find(query);
    res.json(images);
  } catch (error) {
    next(error);
  }
};

const getImageById = async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    next(error);
  }
};

const updateImage = async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    if (image.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    image.description = req.body.description || image.description;
    image.tags = req.body.tags ? req.body.tags.split(',') : image.tags;
    await image.save();
    res.json({ message: 'Image updated successfully', image });
  } catch (error) {
    next(error);
  }
};

const deleteImage = async (req, res, next) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
     if (image.owner.toString() !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    fs.unlinkSync(`./uploads/${image.imageUrl}`);
    await Image.findByIdAndDelete(req.params.id);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
};
