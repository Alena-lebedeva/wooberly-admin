import {
    GraphQLList as List
} from 'graphql';

import  ContentPageDetails  from '../../models/ContentPageDetails';
import ContentPageDetailsType from '../../types/siteadmin/ContentPageDetailsType';
import { resolve } from 'bluebird';

const getContentPageDetails = {
    type: new List(ContentPageDetailsType),

    async resolve({ requset }){
        return await ContentPageDetails.findAll({});
    }
}

export default getContentPageDetails;