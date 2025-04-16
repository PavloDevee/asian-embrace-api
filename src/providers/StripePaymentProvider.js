const PaymentProvider = require('./PaymentProvider');

module.exports = class StripePaymentProvider extends PaymentProvider {
    constructor(key, secret) {
        super(key, secret);
    }

    createOrder() {
        console.log(`Creating stripe order`);
    }

    createCustomer() {
        //implement stripe flow to create order
    }

    initiatePayment() {
        //implement stripe flow to create payment
    }

    updatePaymentStatus() {
        //implement stripe flow to update payment status
    }
}
