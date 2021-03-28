import gql from 'graphql-tag';
import histroy from '../../history';
import { toastr } from 'react-redux-toastr';
import { setLoaderStart, setLoaderComplete } from '../../actions/loader/loader';

export function editCategory(id, categoryName, capacity, isActive, categoryImage, categoryMarkerImage) {

  return async (dispatch, getState, { client }) => {
    const mutation = gql`
      mutation updateCategory(
        $id: Int, 
        $categoryName: String,
        $capacity: Int,
        $isActive: Boolean,
        $categoryImage: String,
        $categoryMarkerImage: String
      ) {
        updateCategory(
          id: $id,
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

    dispatch(setLoaderStart('EditCategory'));

    const { data } = await client.mutate({
      mutation,
      variables: {
        id,
        categoryName,
        capacity,
        isActive: String(isActive) === 'true' ? 1 : 0
      }
    });

    dispatch(setLoaderComplete('EditCategory'));
    if (data && data.updateCategory && data.updateCategory.status === 200) {
      histroy.push('/siteadmin/category');
      toastr.success('Success', 'Category has been updated!')
    } else {
      toastr.error('Error!', "Something went wrong. Please try again.");
    }
  }
}