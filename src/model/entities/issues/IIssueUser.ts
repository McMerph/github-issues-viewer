export default interface IIssueUser {
  login: string;
  avatar: string;
  profile: string;
}

export function isIssueUser(object: {}): object is IIssueUser {
  const cast: IIssueUser = object as IIssueUser;
  return typeof cast.login === "string" &&
    typeof cast.avatar === "string" &&
    typeof cast.profile === "string";
}
