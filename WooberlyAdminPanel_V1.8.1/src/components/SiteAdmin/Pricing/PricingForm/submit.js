import { addUpdatePricing } from '../../../../actions/siteadmin/Pricing/addUpdatePricing';

async function submit(values, dispatch) {
    let isActive = values.isActive == 'true' ? true : false;

    await dispatch(
        addUpdatePricing(
            values.id,
            values.locationId,
            values.categoryId,
            values.currency,
            values.basePrice,
            values.unitPrice,
            values.minutePrice,
            values.riderFeeType,
            values.riderFeeValue,
            values.driverFeeType,
            values.driverFeeValue,
            isActive
        )
    )
}

export default submit;