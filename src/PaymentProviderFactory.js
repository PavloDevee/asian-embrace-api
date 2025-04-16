const PaymentProvider = require('./providers/PaymentProvider');
const StripePaymentProvider = require('./providers/StripePaymentProvider');
const ZenPaymentProvider = require('./providers/ZenPaymentProvider');

module.exports = PaymentProviderFactory = (function () {
    class PaymentProviderFactory {
        constructor() { }

        getPaymentProvider(option = null) {
            switch (option) {
                case 'stripe':
                    return new StripePaymentProvider();
                case 'zen':
                    return new ZenPaymentProvider();
                default:
                    return new PaymentProvider();
            }
        }
    }

    var instance;

    return {
        getInstance: function () {
            if (!instance) {
                instance = new PaymentProviderFactory();
                delete instance.constructor;
            }
            return instance;
        }
    }

})();
