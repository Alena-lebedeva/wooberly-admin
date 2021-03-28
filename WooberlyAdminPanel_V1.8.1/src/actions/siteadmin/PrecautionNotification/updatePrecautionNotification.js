import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import { api } from '../../../config';

const mutation = gql`
    mutation updatePrecautionNotification(
        $id:Int, 
        $title:String!,
        $description:String!, 
        $isEnabled:Boolean!, 
        $imageName:String) {
            updatePrecautionNotification(
                id:$id, 
                title:$title, 
                description:$description, 
                isEnabled:$isEnabled, 
                imageName:$imageName) { 
                    status
                    errorMessage
            }
    }
`;

export function updatePrecautionNotification({ id, title, description, isEnabled, imageName }) {

    return async (dispatch, getState, { client }) => {
        try {
            const { data } = await client.mutate({
                mutation,
                variables: {
                    id,
                    title,
                    description,
                    isEnabled: isEnabled === 'true',
                    imageName
                }
            });

            if (data.updatePrecautionNotification.status == 200) {
                toastr.success("Success!", "Changes are updated!");
            } else {
                toastr.error("Error", "Updating failed");
            }
        }
        catch (error) {
            toastr.error("Oops!", "Something went wrong.");
        }
    };
}

export async function removeStaticBannerImage(fileName) {
    try {
        const url = api.apiEndpoint + "/deleteStaticBannerImage";
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