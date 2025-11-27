export default function handlePostErrors(error, endpoint) {
    // Handle timeout errors
    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
        console.error(`[${endpoint}] Request Timeout — Server took too long to respond`);
        return {
            handled: true,
            status: 'TIMEOUT',
            message: 'The request timed out. Please try again.',
            shouldRetry: true
        };
    }

    // Handle network errors (no response received)
    if (!error.response) {
        console.error(`[${endpoint}] Network Error — Unable to connect to server`);
        return {
            handled: true,
            status: 'NETWORK',
            message: 'Cannot connect to the server. Please check your internet connection.',
            shouldRetry: true
        };
    }

    // Handle HTTP error status codes
    const status = error.response.status;
    let message = '';
    let shouldRetry = false;

    if (status === 400) {
        console.error(`[${endpoint}] 400 Bad Request — Malformed request body or params`);
        message = 'Invalid request data. Please check your input.';
    } else if (status === 401) {
        console.error(`[${endpoint}] 401 Unauthorized — Missing/invalid auth`);
        message = 'Authentication required. Please log in again.';
    } else if (status === 403) {
        console.error(`[${endpoint}] 403 Forbidden — Authenticated but not allowed`);
        message = 'You do not have permission to perform this action.';
    } else if (status === 404) {
        console.error(`[${endpoint}] 404 Not Found — Endpoint doesn't exist`);
        message = 'The requested endpoint was not found.';
    } else if (status === 405) {
        console.error(`[${endpoint}] 405 Method Not Allowed — POST not supported on this endpoint`);
        message = 'This operation is not allowed on this resource.';
    } else if (status === 409) {
        console.error(`[${endpoint}] 409 Conflict — Resource already exists or conflict`);
        message = 'This resource already exists or conflicts with existing data.';
    } else if (status === 413) {
        console.error(`[${endpoint}] 413 Payload Too Large — Request body exceeds size limit`);
        message = 'The uploaded data is too large. Please reduce the size and try again.';
    } else if (status === 415) {
        console.error(`[${endpoint}] 415 Unsupported Media Type — Content-Type not supported`);
        message = 'The data format is not supported by the server.';
    } else if (status === 422) {
        console.error(`[${endpoint}] 422 Unprocessable Entity — Validation failed on request data`);
        message = 'Validation failed. Please check your input data.';
        // Could extract validation errors from error.response.data if available
    } else if (status === 429) {
        console.error(`[${endpoint}] 429 Too Many Requests — Rate limit exceeded`);
        message = 'Too many requests. Please wait a moment and try again.';
        shouldRetry = true;
    } else if (status === 500) {
        console.error(`[${endpoint}] 500 Internal Server Error — Generic backend error`);
        message = 'A server error occurred. Please try again later.';
        shouldRetry = true;
    } else if (status === 502) {
        console.error(`[${endpoint}] 502 Bad Gateway — Invalid response from upstream server`);
        message = 'Server communication error. Please try again later.';
        shouldRetry = true;
    } else if (status === 503) {
        console.error(`[${endpoint}] 503 Service Unavailable — Server temporarily down/overloaded`);
        message = 'Service temporarily unavailable. Please try again later.';
        shouldRetry = true;
    } else if (status === 504) {
        console.error(`[${endpoint}] 504 Gateway Timeout — Upstream server timeout`);
        message = 'Server timeout. Please try again later.';
        shouldRetry = true;
    } else {
        console.error(`[${endpoint}] ${status} Unknown Status — Unhandled error code`);
        message = `An unexpected error occurred (${status}).`;
    }

    return {
        handled: true,
        status: status,
        message: message,
        shouldRetry: shouldRetry,
        originalError: error,
        // For POST, include validation errors if available
        validationErrors: error.response?.data?.errors || null
    };
}