import { editRider } from '../../../actions/siteadmin/editRider';

async function submit(values, dispatch) {
    values.password = values.password ? values.password : undefined;
    await dispatch(
        editRider(
            values
        )
    )

}

export default submit;