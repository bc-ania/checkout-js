import React, { FunctionComponent } from 'react';

import {
    CreditCardPaymentMethodComponent,
    CreditCardPaymentMethodProps,
} from '@bigcommerce/checkout/credit-card-integration';
import {
    PaymentMethodProps,
    PaymentMethodResolveId,
    toResolvableComponent,
} from '@bigcommerce/checkout/payment-integration-api';

import checkoutcomCustomFormFields, { ccDocumentField } from './CheckoutcomCustomFormFields';
import { checkoutcomPaymentMethods, getCheckoutcomValidationSchemas } from './checkoutcomFieldsets';

export interface CheckoutcomCustomPaymentMethodProps
    extends Omit<CreditCardPaymentMethodProps, 'cardFieldset' | 'cardValidationSchema'> {
    checkoutCustomMethod: string;
}

const CheckoutcomCustomPaymentMethod: FunctionComponent<PaymentMethodProps> = ({
    language,
    method,
    checkoutService,
    checkoutState,
    ...rest
}) => {
    const checkoutCustomMethod = method.id;
    const CheckoutcomCustomFieldset =
        checkoutCustomMethod in checkoutcomCustomFormFields
            ? checkoutcomCustomFormFields[
                  checkoutCustomMethod as keyof typeof checkoutcomCustomFormFields
              ]
            : ccDocumentField;

    const billingAddress = checkoutState.data.getBillingAddress();

    return (
        <CreditCardPaymentMethodComponent
            checkoutService={checkoutService}
            checkoutState={checkoutState}
            deinitializePayment={checkoutService.deinitializePayment}
            initializePayment={checkoutService.initializePayment}
            language={language}
            method={method}
            {...rest}
            cardFieldset={<CheckoutcomCustomFieldset debtor={billingAddress!} method={method} />}
            cardValidationSchema={getCheckoutcomValidationSchemas({
                paymentMethod: checkoutCustomMethod as checkoutcomPaymentMethods,
                language,
            })}
        />
    );
};

export default toResolvableComponent<PaymentMethodProps, PaymentMethodResolveId>(
    CheckoutcomCustomPaymentMethod,
    [
        { gateway: 'checkoutcom', id: 'ideal' },
        { gateway: 'checkoutcom', id: 'fawry' },
        { gateway: 'checkoutcom', id: 'oxxo' },
        { gateway: 'checkoutcom', id: 'boleto' },
        { gateway: 'checkoutcom', id: 'sepa' },
        { gateway: 'checkoutcom', id: 'qpay' },
    ],
);
