import { Request, Response, NextFunction } from 'express';
import { AppError } from '../types';

/**
 * Global error handler middleware
 */
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err);

  // Default error values
  let statusCode = 500;
  let message = 'Server error';
  let stack = process.env.NODE_ENV === 'production' ? undefined : err.stack;

  // Check if error is our custom AppError
  if ('statusCode' in err) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err.name === 'ValidationError') {
    // Mongoose validation error
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'CastError') {
    // Mongoose cast error (invalid ID)
    statusCode = 400;
    message = 'Invalid ID format';
  } else if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    // Duplicate key error
    statusCode = 400;
    message = 'Duplicate field value entered';
  } else {
    // Unknown error
    message = err.message || message;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    stack
  });
};