import {
    FETCH_SOCIAL_GROUP_REQUESTED,
    FETCH_SOCIAL_GROUP_SUCCESS,
    FETCH_SOCIAL_GROUP_FAILURE
} from './types';
import axios from '../services/axios';

const groupRequested = () => {
    return {
        type: FETCH_SOCIAL_GROUP_REQUESTED
    };
};

const groupSuccess = (socialGroups) => {
    return {
        type: FETCH_SOCIAL_GROUP_SUCCESS,
        socialGroups
    };
};

const groupError = (error) => {
    return {
        type: FETCH_SOCIAL_GROUP_FAILURE,
        error
    };
};

const fetchSocialGroups = () => {
    return (dispatch) => {
        dispatch(groupRequested());
        axios.get(`socialgroups`)
            .then(response => {
                dispatch(groupSuccess(response.data));
            })
            .catch(error => dispatch(groupError(error.response.data)));
    }
}

export { fetchSocialGroups };