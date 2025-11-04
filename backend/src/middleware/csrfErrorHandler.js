export const csrfErrorHandler = (err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') {
    return next(err);
  }
  return res.status(403).json({ message: 'Token CSRF inválido' });
};
