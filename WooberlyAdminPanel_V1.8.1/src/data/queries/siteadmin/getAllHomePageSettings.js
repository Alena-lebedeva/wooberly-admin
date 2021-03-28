import { HomePage } from '../../models';
import HomePageWholeType from '../../types/siteadmin/HomePageWholeType';


const getAllHomePageSettings = {
    type: HomePageWholeType,

    args: {},

    async resolve({ request }, { id }) {
      const homePageData =  await HomePage.findAll()
        return {
            homePageData
        }
    }
}

export default getAllHomePageSettings;

/*
{
  getAllHomePageSettings{
    homePageData{
      id
      name
      value
    }
    
  }
}
*/