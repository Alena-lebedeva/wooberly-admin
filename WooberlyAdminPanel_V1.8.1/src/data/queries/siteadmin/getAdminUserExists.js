import AdminUserType from '../../types/siteadmin/AdminUserType';
import { AdminUser } from '../../models';
const getAdminUserExists = {
    type: AdminUserType,
    async resolve({ request }) {
        // Check if user already logged in
        if (request.user && request.user.admin) {
            const userData = await AdminUser.findOne({
                attributes: [
                    'id', 'email'
                ],
                where: {
                    id: request.user.id,
                    email: request.user.email,
                }
            })
            if (userData) {
                return {
                    status: 200,
                    userExistStatus: false
                }
            } else {
                return {
                    status: 400,
                    userExistStatus: true
                };
            }
        } else {
            return {
                status: 400,
                userExistStatus: true
            };
        }
    }
};
export default getAdminUserExists;