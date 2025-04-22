function extractDataFromToken(token) {
  return jwt.decode(token)
}


module.exports={
  extractDataFromToken
}