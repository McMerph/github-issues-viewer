import IIssue from "../entities/IIssue";
import IIssuesSettings from "../entities/IIssuesSettings";
import URIS from "./uris";
import NotModifiedError from "./NotModifiedError";

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

function retrieveIssues(parameters: IIssuesSettings, requestETag?: string): Promise<IRetrieveIssuesResponse> {
  const { login, repo, pageNumber, perPage } = parameters;
  let eTag: string;
  let link: string | undefined;

  let requestHeaders: {} = {
    Accept: "application/vnd.github.v3+json",
  };
  if (requestETag) {
    requestHeaders = { ...requestHeaders, "If-None-Match": requestETag };
  }
  // TODO DRY
  return fetch(`${URIS.ROOT}/${URIS.REPOS}/${login}/${repo}/${URIS.ISSUES}?page=${pageNumber}&per_page=${perPage}`, {
    headers: requestHeaders,
    method: "get",
  })
    .then((response) => {
      if (response.status === 200) {
        eTag = response.headers.get("etag") || "";
        link = response.headers.get("link") || undefined;

        return response.json();
      } else if (response.status === 304) {
        throw new NotModifiedError();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((json) => {
      if (isIssueJsonArray(json)) {
        const page: IIssue[] = json.map((issue) => ({
          creationDate: new Date(issue.created_at).toString(),
          number: issue.number,
          title: issue.title,
        }));
        const settings: IIssuesSettings = { login, perPage, repo, pageNumber };
        return { eTag, link, page, settings };
      } else {
        throw new Error("Invalid format");
      }
    });
}

export default retrieveIssues;
export { IRetrieveIssuesResponse };
