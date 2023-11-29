// utils/response.js
function successResponse(data, message = "Request was successful") {
  return {
    success: true,
    message,
    data,
  };
}

function errorResponse(message = "Request failed", error = null) {
  return {
    success: false,
    message,
    error,
  };
}

module.exports = {
  successResponse,
  errorResponse,
};
