import IIssue, { isIssue } from "./IIssue";

export default interface IIssuesPage {
  // TODO DRY
  eTag?: string;

  issues: IIssue[];
}

export function isIssuesPage(object: any): object is IIssuesPage {
  const cast: IIssuesPage = object as IIssuesPage;
  return typeof cast.eTag === "string" &&
    (Array.isArray(cast.issues) && cast.issues.every((issue) => isIssue(issue)));
}
