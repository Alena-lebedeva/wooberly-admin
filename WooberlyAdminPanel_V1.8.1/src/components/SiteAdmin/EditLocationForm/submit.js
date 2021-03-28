import { updateLocation } from '../../../actions/siteadmin/updateLocation';
import { toastr } from 'react-redux-toastr';

async function submit(values, dispatch) {
  values.isActive = values.isActive == true ? 1 : 0;
   await dispatch(
        updateLocation(
            values.locationName,
            JSON.stringify(values.path),
            values.id,
            values.description,
            values.isActive,
        )
    )
}

export default submit;