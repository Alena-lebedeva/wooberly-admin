import { editVehicle } from '../../../actions/siteadmin/editVehicle';

async function submit(values, dispatch) {
    await dispatch(
        editVehicle(
            values.id,
            values.vehicleName,
            values.vehicleType ? parseInt(values.vehicleType) : '',
            values.vehicleNumber,
            values.vehicleStatus ? values.vehicleStatus: 'pending'
        )
    )
}

export default submit;