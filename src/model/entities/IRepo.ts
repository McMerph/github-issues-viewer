export default interface IRepo {
  name: string;
  issues: number;
}

export function isRepo(object: any): object is IRepo {
  const cast: IRepo = object as IRepo;
  return typeof cast.name === "string" &&
    typeof cast.issues === "number";
}
