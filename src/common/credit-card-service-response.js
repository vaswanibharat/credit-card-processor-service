module.exports = (success, description) => {
  let response = {};
  response = {
    success: success || false,
    description: description || undefined,
  };
  return response;
};
