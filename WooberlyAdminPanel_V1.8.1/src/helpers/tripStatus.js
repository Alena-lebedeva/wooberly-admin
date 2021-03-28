export function tripStatus(status) {
    if(status == 'completed') {
        return 'Completed'
    } else if (status == 'approved') {
        return 'Approved'
    } else if (status == 'declined') {
        return 'Declined'
    } else if (status == 'approved') {
        return 'Approved'
    } else if (status == 'started') {
        return 'Started'
    } else if (status == 'cancelledByRider') {
        return 'Cancelled By Rider'
    } else if (status == 'cancelledByDriver') {
        return 'Cancelled By Driver'
    } else if (status == 'completed') {
        return 'Completed'
    } else if (status == 'expired') {
        return 'Expired'
    } 
}