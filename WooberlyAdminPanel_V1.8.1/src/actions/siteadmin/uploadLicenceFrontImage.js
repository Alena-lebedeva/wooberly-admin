import gql from 'graphql-tag';
import { api } from '../../config';
import { toastr } from 'react-redux-toastr';
import {
  LICENCE_IMAGE_UPLOAD_ERROR,
  LICENCE_IMAGE_UPLOAD_START,
  LICENCE_IMAGE_UPLOAD_SUCCESS
} from '../../constants/index'

export default function uploadLicenceFrontImage(id, licenceFront, oldImageFront) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: LICENCE_IMAGE_UPLOAD_START
        })

        try {
            const mutation = gql`
            mutation uploadLicenceFrontImage($userId:ID,$licenceFront:String){
                uploadLicenceFrontImage(userId:$userId, licenceFront:$licenceFront) {
                  status
                }
              }
            `
            const { data } = await client.mutate({
                mutation,
                variables: {
                    userId: id,
                    licenceFront
                }
            })

            if (oldImageFront !== undefined) {
                removeLicenceImage(oldImageFront);
            };
            
            if(data && data.uploadLicenceImage && data.uploadLicenceImage.status == "200") {
                dispatch({
                    type: LICENCE_IMAGE_UPLOAD_SUCCESS
                })
                toastr.success('Success', 'Licence images has been uploaded!')
            } else {
                dispatch({
                    type: LICENCE_IMAGE_UPLOAD_ERROR
                })
            }
        } catch (err) {
            dispatch({
                type: LICENCE_IMAGE_UPLOAD_ERROR
            })
        }
    }
}

async function removeLicenceImage(fileName) {
    try {
      const url = api.apiEndpoint + "/deleteLicenceImage";
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