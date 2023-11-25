export const isValidUrl = (url) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!urlPattern.test(url);
};

export const parseAxiosError = (error) => {
  // Check if the error is due to network issues (not response received)
  if (!error.response) {
    return 'Network error: Please check your internet connection.';
  }

  // Handle HTTP specific errors
  const status = error.response.status;

  switch (status) {
    case 400:
      return 'Bad Request: The server could not understand the request.';
    case 401:
      return 'Unauthorized: Access is denied due to invalid credentials.';
    case 403:
      return 'Forbidden: You do not have the necessary permissions.';
    case 404:
      return 'Not Found: The requested resource could not be found on the server.';
    case 500:
      return 'Internal Server Error: Something went wrong on the server. Please customer service.';
    default:
      return 'An unexpected error ocurred. Please try again later or contact customer service.';
  }
};
