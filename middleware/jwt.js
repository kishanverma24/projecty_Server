import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log(token);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You are not authenticated!",
    });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Token is not valid!",
      });
    }

    req.userId = payload.id; // Attach user ID to the request object for further use
    next(); // Proceed to the next middleware or route handler
  });
};
