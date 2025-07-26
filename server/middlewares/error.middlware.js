export const errorMiddleware = (err, req, res, next) => {
  console.log("🔥 ERROR:", err); 
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    errMessage: err.message,
  });
};
