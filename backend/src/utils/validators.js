import { body, validationResult } from 'express-validator';

export const registerValidation = [
  body('firstName').trim().notEmpty(),
  body('lastName').trim().notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 8 })
];

export const loginValidation = [body('email').isEmail(), body('password').notEmpty()];

export const checkoutValidation = [
  body('firstName').notEmpty(),
  body('lastName').notEmpty(),
  body('email').isEmail(),
  body('address').notEmpty(),
  body('city').notEmpty(),
  body('postalCode').notEmpty(),
  body('country').notEmpty()
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};
