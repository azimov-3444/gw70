import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    let authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token Provider" });
    }
    let token = authHeader.split(" ")[1];
    let claims = jwt.verify(token, "Alisher24");
    req.user = claims;
    next();
  } catch (err) {
    return res.status(500).json({ message: "Failed server" });
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role == "admin") {
      return next();
    } else {
      return res.status(404).json({ message: "Sizga ruxsat yo'q" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Failed server" });
  }
};
