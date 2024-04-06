exports.sendTokens = (student, statusCode, res) => {
  const token = student.getJwt();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure:true
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, id: student._id, token });
};
exports.sendTokenEmploye = (employe, statusCode, res) => {
  const token = employe.getJwt();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure:true
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, id: employe._id, token });
};
