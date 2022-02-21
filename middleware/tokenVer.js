import Jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const token = req.headers.token;
  if (token) {
    Jwt.verify(token, process.env.JWT_Key, (err, user) => {
      if (err) res.status(403).json("token not valid");
      req.user = user;
      next();
    });
  } else {
    res.status(401).json("not authenticated");
  }
};

const verifyTokenandAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};
const verifyTokenandAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ message: "not allowed" });
    }
  });
};
export { verifyToken, verifyTokenandAuthorization, verifyTokenandAdmin };
