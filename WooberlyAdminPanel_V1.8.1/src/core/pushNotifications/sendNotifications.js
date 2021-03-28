var FCM = require('fcm-node');
import { serverKey } from '../../config';

var fcm = new FCM(serverKey);
import { UserLogin } from '../../data/models';

import sequelize from '../../data/sequelize';


export async function sendNotifications(requestContent, userId, toAll, userType) {
    let content = requestContent;
    
    let notificationId = Math.floor(100000 + Math.random() * 900000);
    let deviceIds = [], getdeviceIds;
    let status = 200, requestTime = new Date().getTime();
    
    try {
        content['notificationId'] = notificationId;
        content['content_available'] = true;
        content['click_action'] = 'FLUTTER_NOTIFICATION_CLICK';
        content['requestTime'] = requestTime;

        if (userId) { // Single user
            getdeviceIds = await UserLogin.findAll({
                attributes: ['deviceId'],
                where: {
                    userId
                },
                raw: true
            });
        } else if(toAll) { // Group of users
            getdeviceIds = await UserLogin.findAll({
                attributes: ['deviceId'],
                where: {
                    userId: {
                        in: [
                            sequelize.literal(`SELECT id FROM User WHERE userType=1 AND isBan=0 AND deletedAt IS NULL`)
                        ]
                    }
                },
                raw: true
            });
        }

        deviceIds = getdeviceIds.map((o) => o.deviceId);
        
        let message = {
            registration_ids: deviceIds,
            notification: {
                title: content.title,
                body: content.message,
                content_available: true,
                priority: 'high',
                click_action: 'FLUTTER_NOTIFICATION_CLICK',
                requestTime
            },
            data: {
                content,
                action_loc_key: null,
                click_action: "FLUTTER_NOTIFICATION_CLICK",
                screen: content.screen || "OPEN_PAGE"
            }
        };

        fcm.send(message, function (err, response) {
            if (err) {
                status = 400;
                console.log("Something has gone wrong!", err);
            } else {
                console.log("Successfully sent with response: ", response);
            }

            return {
                status, 
                errorMessge: err 
            };
        });
    } catch(error) {
        return {
            status: 400, 
            errorMessge: error
        };
    }
}

export default {
    sendNotifications
}