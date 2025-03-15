import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';

// Function to create a JWT token
export const createToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
): string => {
  try {
    const options: SignOptions = {
      expiresIn: Number(expiresIn), // This should be valid as part of the SignOptions
    };
    return jwt.sign(jwtPayload, secret, options);
  } catch (error) {
    // Log the error or throw a specific one
    throw new Error('Error creating token');
  }
};

// Function to verify a JWT token
export const verifyToken = (token: string, secret: string): JwtPayload => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};
