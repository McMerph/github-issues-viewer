export default interface IIssueUser {
  avatar: string;
  login: string;
  profile: string;
}

export function isIssueUser(object: any): object is IIssueUser {
  const cast: IIssueUser = object as IIssueUser;
  return typeof cast.avatar === "string" &&
    typeof cast.login === "string" &&
    typeof cast.profile === "string";
}
