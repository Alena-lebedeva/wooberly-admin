import { editCategory } from '../../../actions/siteadmin/editCategory';

async function submit(values, dispatch) {

    await dispatch(
        editCategory(
            values.id,
            values.categoryName,
            values.capacity,
            values.isActive,
            values.categoryImage,
            values.categoryMarkerImage
        )
    )
}

export default submit;