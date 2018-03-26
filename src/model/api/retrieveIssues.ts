import IIssue from "../entities/IIssue";
import IIssuesSettings from "../entities/IIssuesSettings";
import URIS from "./uris";

interface IRetrieveIssuesResponse {
  settings: IIssuesSettings;
  page: IIssue[];
  link?: string;
  eTag: string;
}

interface IIssueJson {
  title: string;
  number: number;
  created_at: string;
}

function isIssueJsonArray(issues: any): issues is IIssueJson[] {
  return Array.isArray(issues) &&
    issues.every((issue) =>
      typeof issue.title === "string" &&
      typeof issue.number === "number" &&
      typeof issue.created_at === "string");
}

// TODO Introduce parameters object
// TODO Make etag optional?
// TODO Use etag
function retrieveIssues(parameters: IIssuesSettings, requestETag?: string): Promise<IRetrieveIssuesResponse> {
  const { login, repo, pageNumber, perPage } = parameters;
  let eTag: string;
  let link: string | undefined;

  // TODO DRY
  return fetch(`${URIS.ROOT}/${URIS.REPOS}/${login}/${repo}/${URIS.ISSUES}?page=${pageNumber}&per_page=${perPage}`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
    method: "get",
  })
    .then((response) => {
      if (response.ok) {
        eTag = response.headers.get("etag") || "";
        link = response.headers.get("link") || undefined;

        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((json) => {
      if (isIssueJsonArray(json)) {
        const page: IIssue[] = json.map((issue) => ({
          creationDate: new Date(issue.created_at),
          number: issue.number,
          title: issue.title,
        }));
        return {
          eTag,
          link,
          page,
          settings: { login, perPage, repo, pageNumber },
        };
      } else {
        throw new Error("Invalid format");
      }
    })
    .catch((error) => {
      // TODO Handle error?
      throw new Error("There has been a problem with your fetch operation: " + error.message);
      // console.error("There has been a problem with your fetch operation: " + error.message);
      // return { page: { apiState: ApiState.Error } };
    });
}

export default retrieveIssues;
export { IRetrieveIssuesResponse };
