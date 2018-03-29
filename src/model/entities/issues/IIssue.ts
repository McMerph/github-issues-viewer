import IIssueUser, { isIssueUser } from "./IIssueUser";

export default interface IIssue {
  title: string;
  number: number;
  creationDate: string;
  user: IIssueUser;
}

export function isIssue(object: {}): object is IIssue {
  const cast: IIssue = object as IIssue;
  return typeof cast.title === "string" &&
    typeof cast.number === "number" &&
    typeof cast.creationDate === "string" &&
    cast.user &&
    isIssueUser(cast.user);
}
