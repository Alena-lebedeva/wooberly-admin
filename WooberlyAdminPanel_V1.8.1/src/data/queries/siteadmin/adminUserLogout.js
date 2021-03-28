import AdminUserLogoutType from '../../types/siteadmin/AdminUserLogoutType';

const adminUserLogout = {
    type: AdminUserLogoutType,

    async resolve({ request, response }) {
        try {
            response.clearCookie('id_token');
            return {
                status: 200
            }
        } catch (error) {
            return {
                status: 400
            }
        }
    }
}

export default adminUserLogout;