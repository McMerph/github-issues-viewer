import ApiState from "./ApiState";
import IIssue, { isIssue } from "./IIssue";

// TODO DRY
export default interface IIssuesPage {
  apiState: ApiState;
  eTag?: string;
  issues?: IIssue[];
}

export function isIssuesPage(object: any): object is IIssuesPage {
  const cast: IIssuesPage = object as IIssuesPage;
  const validApiState: boolean = Object.values(ApiState).includes(cast.apiState);
  const validETag: boolean = !cast.eTag || typeof cast.eTag === "string";
  const validIssues: boolean = !cast.issues ||
    (Array.isArray(cast.issues) &&
      cast.issues.every((issue) => isIssue(issue)));
  return validApiState && validETag && validIssues;
}
