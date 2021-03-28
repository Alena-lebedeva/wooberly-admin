import { editDriver } from '../../../actions/siteadmin/editDriver';

async function submit(values, dispatch) {
    values.password = values.password ? values.password : undefined;
    await dispatch(
        editDriver(
            values
        )
    )
}

export default submit;