import { addPromoCode } from '../../../../actions/siteadmin/PromoCode/addPromoCode';

async function submit(values, dispatch) {
    await dispatch(addPromoCode(values));
}

export default submit;