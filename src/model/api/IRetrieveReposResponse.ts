import IRepo from "../entities/repos/IRepo";

export default interface IRetrieveReposResponse {
  page: IRepo[];
  hasNext: boolean;
  eTag: string;
}
