export default interface IIssue {
  title: string;
  number: number;
  creationDate: Date;
}

export function isIssue(object: any): object is IIssue {
  const cast: IIssue = object as IIssue;
  return typeof cast.title === "string" &&
    typeof cast.number === "number" &&
    cast.creationDate instanceof Date && !isNaN(cast.creationDate.valueOf());
}
