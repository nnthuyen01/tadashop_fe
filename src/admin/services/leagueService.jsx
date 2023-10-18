import axios from 'axios';
import { API_URL } from '~/config/constant';

export default class LeagueService {
    insertLeague = async (league) => {
        return await axios.post(API_URL + 'admin/league', league);
    };
    getLeagues = async () => {
        return await axios.get(API_URL + 'league');
    };
    deleteLeague = async (id) => {
        return await axios.delete(API_URL + 'admin/league/' + id);
    };
    getLeague = async (id) => {
        return await axios.get(API_URL + 'league/' + id + '/get');
    };
    updateLeague = async (id, league) => {
        return await axios.patch(API_URL + 'admin/league/' + id, league);
    };
}
