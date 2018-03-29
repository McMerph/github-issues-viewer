import * as parse from "parse-link-header";
import IIssue from "../entities/issues/IIssue";
import IIssuesRequest from "../entities/issues/IIssuesRequest";
import IRetrieveIssuesResponse from "./IRetrieveIssuesResponse";
import NotModifiedError from "./NotModifiedError";
import URIS from "./uris";

interface IIssueJson {
  title: string;
  number: number;
  created_at: string;
  user: IIssueUserJson;
}

interface IIssueUserJson {
  login: string;
  avatar_url: string;
  html_url: string;
}

function isIssueJsonArray(issues: any): issues is IIssueJson[] {
  return Array.isArray(issues) &&
    issues.every((issue) =>
      typeof issue.title === "string" &&
      typeof issue.number === "number" &&
      typeof issue.created_at === "string" &&
      issue.user &&
      typeof issue.user.login === "string" &&
      typeof issue.user.avatar_url === "string" &&
      typeof issue.user.html_url === "string");
}

function retrieveIssues(request: IIssuesRequest, requestETag?: string): Promise<IRetrieveIssuesResponse> {
  const { login, repo, pageNumber, perPage } = request;
  let eTag: string;
  let link: string | undefined;
  let errorStatus: number;
  let errorStatusText: string;

  // TODO DRY
  let requestHeaders: {} = {
    Accept: "application/vnd.github.v3+json",
  };
  if (requestETag) {
    requestHeaders = { ...requestHeaders, "If-None-Match": requestETag };
  }
  return fetch(`${URIS.ROOT}/${URIS.REPOS}/${login}/${repo}/${URIS.ISSUES}?page=${pageNumber}&per_page=${perPage}`, {
    headers: requestHeaders,
    method: "get",
  })
    .then((response) => {
      if (response.status === 200) {
        eTag = response.headers.get("etag") || "";
        link = response.headers.get("link") || undefined;
      } else if (response.status === 304) {
        // TODO But it is not an error
        throw new NotModifiedError();
      } else {
        errorStatus = response.status;
        errorStatusText = response.statusText;
      }
      return response.json();
    })
    .then((json) => {
      if (isIssueJsonArray(json)) {
        const page: IIssue[] = json.map((issue) => ({
          creationDate: issue.created_at,
          number: issue.number,
          title: issue.title,
          user: {
            avatar: issue.user.avatar_url,
            login: issue.user.login,
            profile: issue.user.html_url,
          },
        }));
        const parsedLink = link && parse(link);
        const lastPageNumber: number = parsedLink && parsedLink.last ?
          parseInt(parsedLink.last.page, 10) : request.pageNumber;
        return { eTag, lastPageNumber, page };
      } else if (errorStatus && errorStatusText) {
        throw new Error("Network response was not ok. " +
          errorStatus + " " + errorStatusText + " " +
          JSON.stringify(json));
      } else {
        throw new Error("Invalid format");
      }
    });
}

export default retrieveIssues;
