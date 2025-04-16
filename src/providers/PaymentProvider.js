/**
 * This is an abstract Payment Provider class.
 */
const MethodNotImplemented = require('./MethodNotImplemented');

module.exports = class PaymentProvider {
    constructor(key = null, secret = null) {
        this.key = key;
        this.secret = secret;
    }

    createOrder() {
        throw new MethodNotImplemented('Concrete payment provider not found');
    }

    createCustomer() {
        throw new MethodNotImplemented();
    }

    initiatePayment() {
        throw new MethodNotImplemented();
    }

    updatePaymentStatus() {
        throw new MethodNotImplemented();
    }
}
