const PaymentProvider = require('./PaymentProvider');

module.exports = class ZenPaymentProvider extends PaymentProvider {
    constructor(key, secret) {
        super(key, secret);
    }

    createOrder() {
        //implement stripe flow to create customer
        console.log(`Creating zen order`);
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
