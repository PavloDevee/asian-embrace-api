const ProviderFactory = require('./PaymentProviderFactory');

(async () => {
    const paymentFactory = ProviderFactory.getInstance();
    const provider = await paymentFactory.getPaymentProvider();

    try {
        provider.createOrder();
    }
    catch (e) {
        console.log(e.message);
    }
})();
