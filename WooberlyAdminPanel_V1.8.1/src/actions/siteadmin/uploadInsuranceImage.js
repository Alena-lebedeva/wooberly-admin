import gql from 'graphql-tag';
import { api } from '../../config';
import { toastr } from 'react-redux-toastr';
import {
  INSURANCE_IMAGE_UPLOAD_ERROR,
  INSURANCE_IMAGE_UPLOAD_START,
  INSURANCE_IMAGE_UPLOAD_SUCCESS
} from '../../constants/index'

export default function uploadInsuranceImage(id, fileName, oldFile) {

    return async (dispatch, getState, { client }) => {
        dispatch({
            type: INSURANCE_IMAGE_UPLOAD_START
        })

        try {
            const mutation = gql`
            mutation uploadInsuranceImage($id: Int, $vehicleInsurance: String) {
                uploadInsuranceImage(id:$id, vehicleInsurance:$vehicleInsurance) {
                  status
                }
              }
            `
            const { data } = await client.mutate({
                mutation,
                variables: {
                    id,
                    vehicleInsurance: fileName
                }
            })

            if (oldFile !== undefined) {
                removeProfileImage(oldFile);
              };
            
            if(data && data.uploadInsuranceImage && data.uploadInsuranceImage.status == "200") {
                dispatch({
                    type: INSURANCE_IMAGE_UPLOAD_SUCCESS
                })
                toastr.success('Success', 'Insurance image has been uploaded!')
            } else {
                dispatch({
                    type: INSURANCE_IMAGE_UPLOAD_ERROR
                })
            }
        } catch (err) {
            dispatch({
                type: INSURANCE_IMAGE_UPLOAD_ERROR
            })
        }
    }
}

async function removeProfileImage(fileName) {
    try {
      const url = api.apiEndpoint + "/deleteInsuranceImage";
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