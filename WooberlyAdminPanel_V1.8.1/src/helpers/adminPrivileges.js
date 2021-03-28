import { openAdminUserModal } from "../actions/siteadmin/modalActions";

const privileges = [
    {
        id: 1,
        privilege: 'Manage Site Settings',
        permittedUrls: [
            '/siteadmin/settings/site'
        ]
    },
    {
        id: 2,
        privilege: 'Homepage Settings',
        permittedUrls: [
            '/siteadmin/homepage/banner',
            '/siteadmin/homepage/category',
            '/siteadmin/homepage/topfeature',
            '/siteadmin/homepage/rider',
            '/siteadmin/homepage/driver',
            '/siteadmin/homepage/footer'
        ]
    },
    {
        id: 3,
        privilege: 'Manage Riders',
        permittedUrls: [
            '/siteadmin/riders'
        ]
    },
    {
        id: 4,
        privilege: 'Manage Drivers',
        permittedUrls: [
            '/siteadmin/drivers'
        ]
    },
    {
        id: 5,
        privilege: 'Manage Vehicles',
        permittedUrls: [
            '/siteadmin/vehicles'
        ]
    },
    {
        id: 6,
        privilege: 'Manage Categories',
        permittedUrls: [
            '/siteadmin/category'
        ]
    },
    {
        id: 7,
        privilege: 'Manage Location',
        permittedUrls: [
            '/siteadmin/location'
        ]
    },
    {
        id: 8,
        privilege: 'Manage Fare',
        permittedUrls: [
            '/siteadmin/pricing/list'
        ]
    },
    {
        id: 9,
        privilege: 'Manage Bookings',
        permittedUrls: [
            '/siteadmin/bookings',
            '/siteadmin/completed-bookings',
            '/siteadmin/cancelled-bookings',
            '/siteadmin/schedule-bookings'
        ]
    },
    // {
    //     id: 10,
    //     privilege: 'Completed Bookings',
    //     permittedUrls: [
    //         '/siteadmin/completed-bookings',
    //     ]
    // },
    // {
    //     id: 11,
    //     privilege: 'Cancelled Bookings',
    //     permittedUrls: [
    //         '/siteadmin/cancelled-bookings'
    //     ]
    // },
    {
        id: 10,
        privilege: 'Ratings',
        permittedUrls: [
            '/siteadmin/ratings'
        ]
    },
    {
        id: 11,
        privilege: 'Manage Promo Code',
        permittedUrls: [
            '/siteadmin/promo-code/list'                      
        ]
    },
    {
        id: 12,
        privilege: 'Manage Notifications',
        permittedUrls: [
            '/siteadmin/notifications'
        ]
    },
    {
        id: 13,
        privilege: 'Cancel Reason',
        permittedUrls: [
            '/siteadmin/cancel-reasons'
        ]
    },
    {
        id: 14,
        privilege: 'Manage Payout',
        permittedUrls: [
            '/siteadmin/payout',
            '/siteadmin/failed-payout/'
        ]
    },
    {
        id: 15,
        privilege: 'Manage CMS Pages',
        permittedUrls: [
            '/siteadmin/staticpage/manage',
            '/siteadmin/contentpage/manage'
        ]
    },
    {
        id: 16,
        privilege: 'Precaution Notification',
        permittedUrls: [
            '/siteadmin/precaution-notification'
        ]
    }
    
];

export function getAllAdminPrivileges() {
    return privileges;
}

export function getAllAdminPrivilegesId() {
    return privileges.map((item) => item.id);
}

export function validatePrivilege(requestId, permittedPrevileges) {
    return permittedPrevileges && permittedPrevileges.length > 0 && permittedPrevileges.indexOf(requestId) >= 0;
}

export function restrictUrls(requestURL, permittedPrevileges) {
    let findRequestedUrlId = privileges.find((o) => o && o.permittedUrls 
        && o.permittedUrls.length > 0 && o.permittedUrls.indexOf(requestURL) >= 0);
    
    if (findRequestedUrlId) {
        let checkAccess = permittedPrevileges && permittedPrevileges.length 
            && permittedPrevileges.indexOf(findRequestedUrlId.id) >= 0;
        if (checkAccess) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }  
}
