import {
    SITE_SETTINGS_SUCCESS
} from '../constants/index'

export default function user(state = {}, action) {
    switch(action.type) {
        case SITE_SETTINGS_SUCCESS:
            return {
                ...state,
                data: action.data
            }

        default:
            return {
              ...state
            };
    }
};
  