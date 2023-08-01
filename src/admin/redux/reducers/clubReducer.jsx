import { CLUB_SET, CLUBS_SET, CLUB_STATE_CLEAR, CLUB_DELETE } from '../actions/actionTypes';

const initialState = {
    club: {},
    clubs: [],
};

const clubReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case CLUB_SET:
            return { ...state, club: payload };
        case CLUBS_SET:
            return { ...state, clubs: payload };
        case CLUB_DELETE:
            return { ...state, clubs: state.clubs.filter((item) => item.id !== payload) };
        case CLUB_STATE_CLEAR:
            return { club: {}, clubs: [] };

        default:
            return state;
    }
};

export default clubReducer;
