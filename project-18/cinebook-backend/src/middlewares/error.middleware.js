module.exports = (err, req, res, next) => {
  console.error("Error:", err.message || err)
  
  const status = err.status || err.statusCode || 500
  const message = err.message || "Internal Server Error"
  
  res.status(status).json({
    error: message,
    timestamp: new Date().toISOString()
  })
}