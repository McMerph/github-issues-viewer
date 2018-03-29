import IIssueUser, { isIssueUser } from "./IIssueUser";

export default interface IIssue {
  creationDate: string;
  number: number;
  title: string;
  url: string;
  user: IIssueUser;
}

export function isIssue(object: any): object is IIssue {
  const cast: IIssue = object as IIssue;
  return typeof typeof cast.creationDate === "string" &&
    typeof cast.number === "number" &&
    typeof cast.title === "string" &&
    typeof cast.url === "string" &&
    cast.user &&
    isIssueUser(cast.user);
}
