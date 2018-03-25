import ApiState from "../entities/ApiState";
import IIssue from "../entities/IIssue";
import IIssuesPage from "../entities/IIssuesPage";
import URIS from "./uris";

interface IIssuesPageResponse {
  page: IIssuesPage;
  linkHeader?: any;
}

interface IIssueJson {
  title: string;
  number: number;

  // TODO Date?
  created_at: string;
}

function isIssuesArrayJson(issues: any): issues is IIssueJson[] {
  return Array.isArray(issues) && issues.every((issue) => isIssueJson(issue));
}

function isIssueJson(issue: any): issue is IIssueJson {
  return typeof issue.title === "string" &&
    typeof issue.number === "number" &&
    typeof issue.created_at === "string";
}

export default function retrieveIssues(login: string, repo: string, page: number): Promise<IIssuesPageResponse> {
  let eTagHeader: string | undefined;
  let linkHeader: string | undefined;

  // TODO per_page=100 after tests
  return fetch(`${URIS.ROOT}/${URIS.REPOS}/${login}/${repo}/${URIS.ISSUES}?page=${page}&per_page=10`, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
    method: "get",
  })
    .then((response) => {
      if (response.ok) {
        eTagHeader = response.headers.get("etag") || undefined;
        linkHeader = response.headers.get("link") || undefined;

        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then((json) => {
      if (isIssuesArrayJson(json)) {
        const issues: IIssue[] = json.map((issue) => ({
          creationDate: new Date(issue.created_at),
          number: issue.number,
          title: issue.title,
        }));
        return {
          linkHeader,
          page: {
            apiState: ApiState.Success,
            eTag: eTagHeader,
            issues,
          },
        };
      } else {
        throw new Error("Info is not properly formatted");
      }
    })
    .catch((error) => {
      console.error("There has been a problem with your fetch operation: " + error.message);
      return { page: { apiState: ApiState.Error } };
    });
}
