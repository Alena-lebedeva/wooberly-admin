import { addCategory } from '../../../actions/siteadmin/addCategory';
import { toastr } from 'react-redux-toastr';

async function submit(values, dispatch) {
    if (!values.categoryImage) {
        toastr.error('Error!', "Category icon is required.");
        return;
    }

    if (!values.categoryMarkerImage) {
        toastr.error('Error!', "Category map marker is required.");
        return;
    }

    await dispatch(
        addCategory(
            values.categoryName,
            values.capacity,
            values.isActive,
            values.categoryImage,
            values.categoryMarkerImage
        )
    )
}

export default submit;