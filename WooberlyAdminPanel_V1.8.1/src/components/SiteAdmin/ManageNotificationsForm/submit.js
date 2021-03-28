import {sendNotifications} from '../../../helpers/push-notification/sendNotifications'
// import { sendNotifications } from '../../../core/pushNotifications/sendNotifications'
import { setLoaderStart, setLoaderComplete } from '../../../actions/loader/loader';
import {reset} from 'redux-form';

async function submit(values, dispatch) {
    let content = {
	    title: values.title + ' Notification!',
        message: values.message
    }
    let userType = values.to;
    
    dispatch(setLoaderStart('sendNotification'));

    await sendNotifications(content, null, userType);
    dispatch(reset('ManageNotificationsForm'));
    dispatch(setLoaderComplete('sendNotification'));
}

export default submit;
