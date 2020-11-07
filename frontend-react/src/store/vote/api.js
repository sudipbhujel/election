import api from "../config.auth";
import authHeader from "../../services/auth-header";

export const requestBallotApi = async (creds) => {
  try {
    const response = await api().post("/api/vote/validate/card/", creds, {
      headers: authHeader(),
    });
    return response.data;
  } catch (e) {
    if (e.response.data.errors) {
      throw Error(...e.response.data.errors);
    } else if (e.response.statusText) {
      throw Error(e.response.statusText);
    } else {
      throw Error(`${e.response.statusText} error!`);
    }
  }
};

export const doVoteApi = async (ballot) => {
  try {
    const response = await api().post("/api/vote/", ballot, {
      headers: authHeader(),
    });
    return response.data;
  } catch (e) {
    if (e.response.data) {
      throw e.response;
    } else if (e.response.statusText) {
      throw Error(e.response.statusText);
    } else {
      throw Error(`${e.response.statusText} error!`);
    }
  }
};
