const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.message === 'Invalid file type. Only images are allowed.') {
        return res.status(400).json({message: err.message});
  }

  res.status(500).json({ message: 'Something went wrong' });
};

module.exports = {
  errorHandler,
};
