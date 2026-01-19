import { SignJWT, jwtVerify } from 'jose';

export const generateAccessToken = async (userId) => {
  try {
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    const expiresIn = process.env.ACCESS_TOKEN_EXPIRY || '7d';
    
    // Convert expiry string to seconds
    const expiryInSeconds = expiresIn.endsWith('d') 
      ? parseInt(expiresIn) * 24 * 60 * 60 
      : parseInt(expiresIn);

    const authToken = await new SignJWT({ _id: userId.toString() })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(Math.floor(Date.now() / 1000) + expiryInSeconds)
      .sign(secret);

    return { authToken };
  } catch (error) {
    console.error('Error generating access token:', error);
    throw new Error('Failed to generate access token');
  }
};

export const verifyAccessToken = async (token) => {
  try {
    const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};