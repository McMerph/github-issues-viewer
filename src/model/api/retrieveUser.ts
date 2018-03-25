import ApiState from "../entities/ApiState";
import IUser from "../entities/IUser";
import URIS from "./uris";

interface IUserJson {
  avatar_url: string;
  login: string;
}

function isValidUserJson(json: any): json is IUserJson {
  return typeof json.avatar_url === "string" && typeof json.login === "string";
}

export default function retrieveUser(login: string): Promise<IUser> {
  let eTag: string | undefined;

  return fetch(`${URIS.ROOT}/${URIS.USERS}/${login}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
    method: "get",
  })
    .then((response) => {
      if (response.ok) {
        eTag = response.headers.get("etag") || undefined;
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((json) => {
      if (isValidUserJson(json)) {
        return {
          apiState: ApiState.Success,
          avatarUrl: json.avatar_url,
          eTag,
          login: json.login,
        };
      } else {
        throw new Error("Info is not properly formatted");
      }
    })
    .catch((error) => {
      console.error("There has been a problem with your fetch operation: " + error.message);
      return { apiState: ApiState.Error };
    });
}
