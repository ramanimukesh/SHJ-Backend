
const healthCheck = async (req, res) => {
  res.json({
         status: 'UP',
         timestamp: new Date().toISOString()
     });
};

module.exports = { healthCheck };