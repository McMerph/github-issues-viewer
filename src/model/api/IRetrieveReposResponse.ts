import IRepo from "../entities/repos/IRepo";

export default interface IRetrieveReposResponse {
  eTag: string;
  hasNext: boolean;
  page: IRepo[];
}
