import axios from 'axios';
import { API_URL } from '~/config/constant';

export default class ClubService {
    insertClub = async (club) => {
        return await axios.post(API_URL + 'admin/club', club);
    };
    getClubs = async () => {
        return await axios.get(API_URL + 'club');
    };
    deleteClub = async (id) => {
        return await axios.delete(API_URL + 'admin/club/' + id);
    };
    getClub = async (id) => {
        return await axios.get(API_URL + 'club/' + id + '/get');
    };
    updateClub = async (id, club) => {
        return await axios.patch(API_URL + 'admin/club/' + id, club);
    };
}
