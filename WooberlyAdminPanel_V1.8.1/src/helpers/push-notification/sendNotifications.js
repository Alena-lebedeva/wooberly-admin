import fetch from 'node-fetch';
import { toastr } from 'react-redux-toastr';

export async function sendNotifications(requestContent, userId, userType) {

    let content = requestContent;

    const resp = await fetch('/push-notification', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content,
            userId,
            userType
        }),
        credentials: 'include'
    });
    
    const { status, errorMessge } = await resp.json();
    
    toastr.success('Success!', 'Push notification has been sent.');
   
    return await {
        status,
        errorMessge
    };
}

export default {
    sendNotifications
}
