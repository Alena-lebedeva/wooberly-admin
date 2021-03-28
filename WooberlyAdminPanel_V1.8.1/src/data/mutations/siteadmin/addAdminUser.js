// GrpahQL
import {
  GraphQLString as StringType,
  GraphQLBoolean as BooleanType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import AdminUserLoginType from '../../types/siteadmin/AdminUserLoginType';

// Sequelize models
import { AdminUser } from '../../../data/models';

const addAdminUser = {

  type: AdminUserLoginType,

  args: {
    email: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
    isSuperAdmin: { type: BooleanType },
  },

  async resolve({ request, response }, {
    email,
    password,
    isSuperAdmin
  }) {
    // Check if user already logged in
    if (!request.user) {

      // Check if the user is already exists
      const userLogin = await AdminUser.findOne({
        attributes: ['id', 'email'],
        where: { email: email }
      });

      // Let the user in
      if (userLogin) {
        return {
          status: 400,
          errorType: "email",
        };
      } else {
        // Create new User & Profile
        const createUser = await AdminUser.create({
          email,
          password: AdminUser.prototype.generateHash(password),
          isSuperAdmin
        });

        if (createUser) {
          return await {
            status: 200
          }
        } else {
          return await {
            status: 400,
            errorType: "invalid",
            errorMessage: "Oops, something went wrong. Unable to create an admin user."
          }
        }
      }
    } else {
      return await {
        status: 400,
        errorType: "loggedIn",
      }
    }
  }
};

export default addAdminUser;

/*

mutation addAdminUser(
  $email: String!
  $password: String!
  $isSuperAdmin: Boolean){
    addAdminUser(
      email: $email,
      password: $password,
      isSuperAdmin: $isSuperAdmin
    ) {
      status
      errorType
      errorMessage
    }
}

*/
