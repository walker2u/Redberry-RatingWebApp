export const errorHandler = (statusCode, message) => {
    const err = new Error();
    err.statuscode = statusCode || 500;
    err.message = message || 'Internal Server Error';
    return err;
}