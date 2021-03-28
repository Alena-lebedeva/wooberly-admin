import { addLocation } from '../../../actions/siteadmin/addLocation';
import { toastr } from 'react-redux-toastr';

async function submit(values, dispatch) {

   await dispatch(
        addLocation(
            values.locationName,
            JSON.stringify(values.path),
        )
    )
}

export default submit;