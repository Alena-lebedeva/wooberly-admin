import { toastr } from 'react-redux-toastr';
import { updatePrecautionNotification } from '../../../actions/siteadmin/PrecautionNotification/updatePrecautionNotification';

async function submit(values, dispatch) {

    if (values.description == null || values.description == '<p><br></p>' || values.description == '<p> </p>') {
        toastr.error("Error Occured", "Please Add  Description");
    } else {
        await dispatch(updatePrecautionNotification(values));
    }
}

export default submit;