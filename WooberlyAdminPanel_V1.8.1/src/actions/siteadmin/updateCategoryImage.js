import gql from 'graphql-tag';
import { api } from '../../config';
import { toastr } from 'react-redux-toastr';
import {
  CATEGORY_IMAGE_UPLOAD_START,
  CATEGORY_IMAGE_UPLOAD_SUCCESS,
  CATEGORY_IMAGE_UPLOAD_ERROR
} from '../../constants/index'

export default function updateCategoryImage(id, fileName, oldPicture) {

  return async (dispatch, getState, { client }) => {
    try {

      dispatch({
        type: CATEGORY_IMAGE_UPLOAD_START,
        payload: {
          imageUploadLoading: true
        }
      })

      const mutation = gql`
        mutation updateCategoryImage($id: Int, 
             $fileName: String
             ) {
            updateCategoryImage(
              id: $id
              fileName: $fileName
            ){
              status
            }
          }
        `;

      const { data } = await client.mutate({
        mutation,
        variables: {
          id,
          fileName
        }
      });

      if (data.updateCategoryImage.status === 200) {
        dispatch({
          type: CATEGORY_IMAGE_UPLOAD_SUCCESS,
          payload: {
            imageUploadLoading: false
          }
        })
        toastr.success('Success', 'Category image has been uploaded!')
      } else {
        dispatch({
          type: CATEGORY_IMAGE_UPLOAD_ERROR,
          payload: {
            imageUploadLoading: false
          }
        })
      }
      
      if (oldPicture !== null) {
        removeCategoryImage(oldPicture);
      };
    } catch (err) {
      dispatch({
        type: CATEGORY_IMAGE_UPLOAD_ERROR,
        payload: {
          imageUploadLoading: false
        }
      })
    }
  }
}

async function removeCategoryImage(fileName) {
  try {
    const url = api.apiEndpoint + "/deleteCategoryImage";
    const resp = await fetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName }),
    });

    const { status } = await resp.json();

    if (status) {
      return { 
        status
      };
  }

  } catch (err) {
    console.log(err);
  }
}