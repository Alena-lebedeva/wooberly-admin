import gql from 'graphql-tag';
import histroy from '../../history';
import { toastr } from 'react-redux-toastr';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

export function addCategory(categoryName, capacity, isActive, categoryImage, categoryMarkerImage) {

  return async (dispatch, getState, { client }) => {
    const mutation = gql`
        mutation addCategory(
          $categoryName: String,
          $capacity: Int,
          $isActive: Boolean,
          $categoryImage: String,
          $categoryMarkerImage: String
        ) {
        addCategory(
          categoryName: $categoryName,
          capacity: $capacity,
          isActive: $isActive,
          categoryImage: $categoryImage,
          categoryMarkerImage: $categoryMarkerImage
        ){
          status
          errorMessage
        }
      }
    `;

    dispatch(setLoaderStart('AddCategory'));

    const { data } = await client.mutate({
      mutation,
      variables: {
        categoryName,
        capacity,
        isActive: String(isActive) === 'true' ? 1 : 0,
        categoryImage,
        categoryMarkerImage
      }
    });
    
    dispatch(setLoaderComplete('AddCategory'));

    if (data && data.addCategory && data.addCategory.status === 200) {
      toastr.success('Success!', 'The category has been added successfully.');
      histroy.push('/siteadmin/category');
    } else if (data && data.addCategory && data.addCategory.status !== 200){
      toastr.error('Error!', data.addCategory.errorMessage);
    } else {
      toastr.error('Error!', "Something went wrong. Please try again.");
    }
  }
}