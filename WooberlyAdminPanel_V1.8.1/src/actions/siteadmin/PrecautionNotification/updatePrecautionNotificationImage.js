import gql from 'graphql-tag';
import { toastr } from 'react-redux-toastr';
import { removeStaticBannerImage } from './updatePrecautionNotification';

const mutation = gql`
    mutation updatePrecautionNotificationImage(
        $id:Int!,
        $imageName:String) {
            updatePrecautionNotificationImage(
                id:$id,
                imageName:$imageName) {
                    status
                    errorMessage
            }
    }
`;

export function updatePrecautionNotificationImage({ id, imageName }, oldImage) {

    return async (dispatch, getState, { client }) => {
        try {
            if (oldImage) await removeStaticBannerImage(oldImage);

            const { data } = await client.mutate({
                mutation,
                variables: {
                    id,
                    imageName
                }
            });

            if (data.updatePrecautionNotificationImage && data.updatePrecautionNotificationImage.status == 200) {
                toastr.success("Success!", "Changes are updated!");
            } else {
                toastr.error("Error", "Updating failed");
            }
        }
        catch (error) {
            console.log(error)
            toastr.error("Oops!", "Something went wrong.");
        }
    };
}