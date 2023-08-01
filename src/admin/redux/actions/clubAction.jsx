import ClubService from '../../services/clubServices';
import {
    CLUBS_SET,
    CLUB_DELETE,
    CLUB_SET,
    CLUB_STATE_CLEAR,
    COMMON_ERROR_SET,
    COMMON_LOADING_SET,
    COMMON_MESSAGE_SET,
} from './actionTypes';

export const insertClub = (club, navigate) => async (dispatch) => {
    const service = new ClubService();

    try {
        console.log('Insert club');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.insertClub(club);

        if (response.status === 201) {
            dispatch({
                type: CLUB_SET,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Club is saved',
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
        console.log(response);
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }

    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
    navigate('/dashboard/club/list');
};

export const updateClub = (id, club, navigate) => async (dispatch) => {
    const service = new ClubService();

    try {
        console.log('update club');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.updateClub(id, club);
        if (response.status === 201) {
            dispatch({
                type: CLUB_SET,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Club is updated',
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
        console.log(response);
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }

    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
    navigate('/dashboard/club/list');
};

export const getClubs = () => async (dispatch) => {
    const service = new ClubService();

    try {
        console.log('Get Clubs');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getClubs();

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: CLUBS_SET,
                payload: response.data,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};

export const deleteClub = (id) => async (dispatch) => {
    const service = new ClubService();

    try {
        console.log('Delete Club');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.deleteClub(id);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: CLUB_DELETE,
                payload: id,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: response.data,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};

export const getClub = (id) => async (dispatch) => {
    const service = new ClubService();

    try {
        console.log('Get Club');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getClub(id);

        if (response.status === 200) {
            dispatch({
                type: CLUB_SET,
                payload: response.data,
            });
        } else {
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message,
            });
        }
    } catch (error) {
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error.response.data ? error.response.data.message : error.message,
        });
    }
    dispatch({
        type: COMMON_LOADING_SET,
        payload: false,
    });
};
export const clearClubState = () => (dispatch) => {
    dispatch({ type: CLUB_STATE_CLEAR });
};
export const clearClub = () => (dispatch) => {
    dispatch({ type: CLUB_SET, payload: { id: '', name: '', status: 'Visible' } });
};
