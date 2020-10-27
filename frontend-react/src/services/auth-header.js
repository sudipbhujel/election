import {loadState} from "./localStorage"

export default function authHeader() {
    const token = loadState().auth.data.access.token;

    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}
