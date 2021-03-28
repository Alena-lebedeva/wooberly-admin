import { addCancelReason } from '../../../actions/siteadmin/addCancelReason'

async function submit(values, dispatch) {
    await dispatch(addCancelReason(values))
}

export default submit;