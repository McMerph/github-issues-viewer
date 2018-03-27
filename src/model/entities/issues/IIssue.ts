export default interface IIssue {
  title: string;
  number: number;
  creationDate: string;
}

export function isIssue(object: {}): object is IIssue {
  const cast: IIssue = object as IIssue;
  return typeof cast.title === "string" &&
    typeof cast.number === "number" &&
    typeof cast.creationDate === "string";
}
