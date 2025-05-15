import logger from "../config/logger.js";

export default function errorHandling(app) {
  app.use((req, res) => {
    res.status(404).json({ message: "This route does not exist" });
  });


  app.use((err, req, res, _next) => {
    logger.error(`${req.method} ${req.path} - ${err.message}`);

    const status = err.status || 500;
    res.status(status).json({
      errorMessage: err.status === 500
        ? "Error interno del servidor"
        : err.message
    });
  });
}