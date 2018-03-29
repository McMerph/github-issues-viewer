export default interface IRepo {
  issues: number;
  name: string;
}

export function isRepo(object: any): object is IRepo {
  const cast: IRepo = object as IRepo;
  return typeof cast.issues === "number" &&
    typeof cast.name === "string";
}
