import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err.message || err);

  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'An unexpected error occurred.',
  });
};
