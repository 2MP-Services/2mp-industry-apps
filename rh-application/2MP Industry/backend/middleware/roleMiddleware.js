const roleMiddleware = (allowedRoles) => {
    return (req, res, next) => {
      const userRole = req.user.role;
  
      if (!allowedRoles.includes(userRole.toString())) {
        return res.status(403).json({ message: 'Permission refusée.' });
      }
  
      next();
    };
  };
  
  module.exports = roleMiddleware;