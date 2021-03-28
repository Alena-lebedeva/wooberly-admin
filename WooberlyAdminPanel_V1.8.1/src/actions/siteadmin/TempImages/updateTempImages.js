import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';

export function updateTempImages(tableName, fieldName, fileName) {

  return async (dispatch, getState, { client }) => {
    const mutation = gql`
        mutation updateTempImages(
          $tableName: String,
          $fieldName: String,
          $fileName: String
        ) {
        updateTempImages(
          tableName: $tableName,
          fieldName: $fieldName,
          fileName: $fileName
        ){
          status
        }
      }
    `;


    const { data } = await client.mutate({
      mutation,
      variables: {
        tableName,
        fieldName,
        fileName
      }
    });


    if (data && data.updateTempImages && data.updateTempImages.status == 200) {
      toastr.success('Success!', fileName ? 'Your Image has been upload.' : 'Your Image has been removed.');
    } else {
      toastr.error('Error!', "Something went wrong. Please try again.");
    }
  }
}