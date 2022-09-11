module.exports = {
    addCardInput: {
        requestDetails: {
            name: 'Bharat',
            cardNumber: '79927398713',
            limit: '2000'
        },
    },
    addCardInputIncomplete: {
        requestDetails: {
            name: 'Bharat',
            limit: '2000'
        },
    },
    addCardInputEmpty: {
        requestDetails: {
            name: 'Bharat',
            cardNumber: '',
            limit: '2000'
        },
    },
    addInvalidCardValue: {
        requestDetails: {
            name: 'Bharat',
            cardNumber: '1234',
            limit: '2000'
        },
    },
    addIncorrectCardValue: {
        requestDetails: {
            name: 'Bharat',
            cardNumber: '799273987131213141516',
            limit: '2000'
        },
    },
    
};