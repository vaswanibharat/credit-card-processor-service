module.exports = {
    successResponse: {
        success: true,
        description: 'Card details added successfully',
    },
    inputIncompleteResponse: {
        success: false,
        description: 'inputBody.requestDetails.cardNumber is required',
    },
    inputEmptyResponse: {
        success: false,
        description: 'inputBody.requestDetails.cardNumber is not allowed to be empty',
    },
    invalidCardResponse: {
        success: false,
        description: 'Invalid Card number',
    },
    incorrectCardResponse: {
        success: false,
        description: 'Invalid Card length',
    },
    dbNotAvailableResponse: {
        success: false,
        description: 'Database Unavailable',
    },
    invalidAPIKeyResponse: {
        success: false,
        description: 'Authentication failed: Invalid api key',
    },
};