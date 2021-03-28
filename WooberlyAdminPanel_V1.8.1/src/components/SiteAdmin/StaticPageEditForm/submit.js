import { toastr } from 'react-redux-toastr';
import { updateStaticPage } from '../../../actions/siteadmin/updateStaticPage';
async function submit(values, dispatch) {

    if (values.content == null || values.content == '<p><br></p>' || values.content == '<p> </p>') {
        toastr.error("Error Occured", "Please Add  Content");
    } else {
        await dispatch(updateStaticPage(values));
    }
}

export default submit;