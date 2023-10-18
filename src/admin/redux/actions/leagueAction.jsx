import LeagueService from '../../services/leagueService';
import {
    LEAGUES_SET,
    LEAGUE_DELETE,
    LEAGUE_SET,
    LEAGUE_STATE_CLEAR,
    COMMON_ERROR_SET,
    COMMON_LOADING_SET,
    COMMON_MESSAGE_SET,
} from './actionTypes';

export const insertLeague = (league, navigate) => async (dispatch) => {
    const service = new LeagueService();

    try {
        console.log('Insert league');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.insertLeague(league);

        if (response.status === 201) {
            dispatch({
                type: LEAGUE_SET,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'League is saved',
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
    navigate('/dashboard/league/list');
};

export const updateLeague = (id, league, navigate) => async (dispatch) => {
    const service = new LeagueService();

    try {
        console.log('update league');

        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.updateLeague(id, league);
        if (response.status === 201) {
            dispatch({
                type: LEAGUE_SET,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'League is updated',
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
    navigate('/dashboard/league/list');
};

export const getLeagues = () => async (dispatch) => {
    const service = new LeagueService();

    try {
        console.log('Get Leagues');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getLeagues();

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: LEAGUES_SET,
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

export const deleteLeague = (id) => async (dispatch) => {
    const service = new LeagueService();

    try {
        console.log('Delete League');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.deleteLeague(id);

        console.log(response);
        if (response.status === 200) {
            dispatch({
                type: LEAGUE_DELETE,
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

export const getLeague = (id) => async (dispatch) => {
    const service = new LeagueService();

    try {
        console.log('Get League');
        dispatch({
            type: COMMON_LOADING_SET,
            payload: true,
        });

        const response = await service.getLeague(id);

        if (response.status === 200) {
            dispatch({
                type: LEAGUE_SET,
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
export const clearLeagueState = () => (dispatch) => {
    dispatch({ type: LEAGUE_STATE_CLEAR });
};
export const clearLeague = () => (dispatch) => {
    dispatch({ type: LEAGUE_SET, payload: { id: '', name: '', status: 'Visible' } });
};
