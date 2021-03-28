import gql from 'graphql-tag';
import { api } from '../../config';
import { toastr } from 'react-redux-toastr';
import {
  RCBOOK_IMAGE_UPLOAD_ERROR,
  RCBOOK_IMAGE_UPLOAD_START,
  RCBOOK_IMAGE_UPLOAD_SUCCESS
} from '../../constants/index'

export default function uploadRcbookImage(id, fileName, oldFile) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: RCBOOK_IMAGE_UPLOAD_START
        })

        try {
            const mutation = gql`
            mutation uploadRcbookImage($id: Int, $vehicleRC: String) {
                uploadRcbookImage(id:$id, vehicleRC:$vehicleRC) {
                  status
                }
              }
            `
            const { data } = await client.mutate({
                mutation,
                variables: {
                    id,
                    vehicleRC: fileName
                }
            })

            if (oldFile !== undefined) {
                removeProfileImage(oldFile);
              };
            
            if(data && data.uploadRcbookImage && data.uploadRcbookImage.status == "200") {
                dispatch({
                    type: RCBOOK_IMAGE_UPLOAD_SUCCESS
                })
                toastr.success('Success', 'RC book image has been uploaded!')
            } else {
                dispatch({
                    type: RCBOOK_IMAGE_UPLOAD_ERROR
                })
            }
        } catch (err) {
            dispatch({
                type: RCBOOK_IMAGE_UPLOAD_ERROR
            })
        }
    }
}

async function removeProfileImage(fileName) {
    try {
      const url = api.apiEndpoint + "/deleteRcbookImage";
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