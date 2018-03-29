import * as parse from "parse-link-header";
import IIssue from "../entities/issues/IIssue";
import IIssuesRequest from "../entities/issues/IIssuesRequest";
import IResponseParameters from "./IResponseParameters";
import IRetrieveIssuesResponse from "./IRetrieveIssuesResponse";
import URIS from "./uris";
import { getError, getQueryParams, getRequestInit, handleResponse } from "./utils";

interface IIssueJson {
  created_at: string;
  html_url: string;
  number: number;
  title: string;
  user: IIssueUserJson;
}

interface IIssueUserJson {
  avatar_url: string;
  html_url: string;
  login: string;
}

function isIssueJsonArray(issues: any): issues is IIssueJson[] {
  return Array.isArray(issues) &&
    issues.every((issue) =>
      typeof issue.created_at === "string" &&
      typeof issue.html_url === "string" &&
      typeof issue.number === "number" &&
      typeof issue.title === "string" &&
      issue.user &&
      typeof issue.user.avatar_url === "string" &&
      typeof issue.user.html_url === "string" &&
      typeof issue.user.login === "string");
}

function retrieveIssues(request: IIssuesRequest, requestETag?: string): Promise<IRetrieveIssuesResponse> {
  const { login, repo, pageNumber, perPage } = request;
  let responseParameters: IResponseParameters = {};

  return fetch(
    `${URIS.ROOT}/${URIS.REPOS}/${login}/${repo}/${URIS.ISSUES}${getQueryParams(pageNumber, perPage)}`,
    getRequestInit(requestETag),
  )
    .then((response) => {
      responseParameters = handleResponse(response);
      return response.json();
    })
    .then((json) => {
      if (isIssueJsonArray(json)) {
        const page: IIssue[] = json.map((issue) => ({
          creationDate: issue.created_at,
          number: issue.number,
          title: issue.title,
          url: issue.html_url,
          user: {
            avatar: issue.user.avatar_url,
            login: issue.user.login,
            profile: issue.user.html_url,
          },
        }));
        const { eTag, link } = responseParameters;
        const parsedLink = link && parse(link);
        const lastPageNumber: number = parsedLink && parsedLink.last ?
          parseInt(parsedLink.last.page, 10) : request.pageNumber;
        return { eTag: eTag || "", lastPageNumber, page };
      } else {
        throw getError(json, responseParameters);
      }
    });
}

export default retrieveIssues;
