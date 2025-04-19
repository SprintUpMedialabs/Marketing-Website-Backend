"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(`Error occurred during ${req.method} request to ${req.url} | Status: ${err.statusCode || 500} | Message: ${err.message || 'No error message'} | Stack: ${err.stack || 'No stack trace'}`);
    // if statusCode is there it means that message will also be created by us
    // if statusCode is not there it means that message is not created by us its something else in this situation we want to send internal server error.
    let statusCode = err.statusCode ? err.statusCode : 500;
    let message = err.statusCode ? err.message : 'Internal Server Error. Please try again later.';
    res.status(statusCode).json({
        success: false,
        message,
        data: null
    });
};
exports.errorHandler = errorHandler;
