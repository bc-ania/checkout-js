import React, { FunctionComponent } from 'react';

import {
    PaymentMethodProps,
    PaymentMethodResolveId,
    toResolvableComponent,
} from '@bigcommerce/checkout/payment-integration-api';
import { Fieldset, Legend } from '@bigcommerce/checkout/ui';

import { isBlueSnapDirectInitializationData } from './BlueSnapDirectInitializationData';
import BlueSnapDirectTextField from './fields/BlueSnapDirectTextField';
// import getIdealValidationSchema from './validation-schemas/getIdealValidationSchema';

const BlueSnapDirectPayByBankPaymentMethod: FunctionComponent<PaymentMethodProps> = ({
    method,
    // checkoutService: { initializePayment, deinitializePayment },
    // paymentForm: { setValidationSchema },
    language,
}) => {
    if (!isBlueSnapDirectInitializationData(method.initializationData)) {
        throw new Error('Unable to get initialization data');
    }

    console.log('bluesnap');

    // const initializeIdeal = useCallback(async () => {
    //     setValidationSchema(method, getIdealValidationSchema(language));

    //     await initializePayment({
    //         gatewayId: method.gateway,
    //         methodId: method.id,
    //     });
    // }, [initializePayment, method, setValidationSchema, language]);

    // const deinitializeIdeal = useCallback(async () => {
    //     await deinitializePayment({
    //         gatewayId: method.gateway,
    //         methodId: method.id,
    //     });
    // }, [deinitializePayment, method.gateway, method.id]);

    // useEffect(() => {
    //     void initializeIdeal();

    //     return () => {
    //         void deinitializeIdeal();
    //     };
    // }, [deinitializeIdeal, initializeIdeal]);

    return (
        <Fieldset
            legend={<Legend hidden>{language.translate('payment.ideal.label')}</Legend>}
            style={{ paddingBottom: '1rem' }}
        >
            <BlueSnapDirectTextField
                autoComplete="iban"
                labelContent={language.translate('payment.bluesnap_direct_iban.label')}
                name="iban"
                useFloatingLabel={true}
            />
        </Fieldset>
    );
};

export default toResolvableComponent<PaymentMethodProps, PaymentMethodResolveId>(
    BlueSnapDirectPayByBankPaymentMethod,
    [{ id: 'pay_by_bank', gateway: 'bluesnapdirect' }],
);
