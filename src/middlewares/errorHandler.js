module.exports = (err, req, res, next) => {
  let status = err.statusCode || 500;
  let message = err.message;

  if (err.name === 'ValidationError') status = 400;                                // mongoose validation
  if (err.name === 'CastError') { status = 400; message = `Invalid ${err.path}`; } // bad id
  if (err.code === 11000) { status = 409; message = 'Duplicate value'; }           // unique index

  if (status === 500) console.error(err);
  res.status(status).json({ error: status === 500 ? 'Internal server error' : message });
};
