import IIssues from "./entities/IIssues";
import IReposPage from "./entities/IReposPage";
import IUser from "./entities/IUser";

export default interface IStore {
  issues: IIssues;
  user: IUser;
  repos: IReposPage[];
}
