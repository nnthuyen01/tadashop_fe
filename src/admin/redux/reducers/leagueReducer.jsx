import { LEAGUE_SET, LEAGUES_SET, LEAGUE_STATE_CLEAR, LEAGUE_DELETE } from '../actions/actionTypes';

const initialState = {
    league: {},
    leagues: [],
};

const leagueReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case LEAGUE_SET:
            return { ...state, league: payload };
        case LEAGUES_SET:
            return { ...state, leagues: payload };
        case LEAGUE_DELETE:
            return { ...state, leagues: state.leagues.filter((item) => item.id !== payload) };
        case LEAGUE_STATE_CLEAR:
            return { league: {}, leagues: [] };

        default:
            return state;
    }
};

export default leagueReducer;
