var FCM = require('fcm-node');
var fcm = new FCM(serverKey);

import { serverKey } from '../../config';
import { UserLogin } from '../../data/models';
import sequelize from '../../data/sequelize';

const pushNotificationRoutes = app => {

    app.post('/push-notification', async function (req, res) {
        try {
            let userId = req.body.userId;
            let content = req.body.content;
            let userType = req.body.userType;
            let notificationId = Math.floor(100000 + Math.random() * 900000);
            let deviceIds = [];
            let status = 200, requestTime = new Date().getTime();
            content['notificationId'] = notificationId;
            content['content_available'] = true;
            content['click_action'] = 'FLUTTER_NOTIFICATION_CLICK';
            content['requestTime'] = requestTime;
            let getdeviceIds;

            if(userId!= null) {
                getdeviceIds = await UserLogin.findAll({
                    attributes: ['deviceId'],
                    where: {
                        userId
                    },
                    raw: true
                });
            } else if (userType) {
                if (userType == 'all') {
                    getdeviceIds = await UserLogin.findAll({
                        attributes: ['deviceId'],
                        raw: true
                    });
                    
                } else {
                    getdeviceIds = await UserLogin.findAll({
                        attributes: ['deviceId'],
                        where: {
                            userId: {
                                in: [sequelize.literal(`SELECT id FROM User WHERE userType=${Number(userType)} AND isBan=0 AND deletedAt IS NULL`)]
                            }
                        },
                        raw: true
                    })

                }
            }

            deviceIds = getdeviceIds.map((o) => o.deviceId);

            var message = {
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

                console.log('status', status)

                res.send({ status, errorMessge: err });
            });
        } catch(error) {
            console.log('error', error)
            res.send({ status: 500, errorMessge: error});
        }
    });
};

export default pushNotificationRoutes;