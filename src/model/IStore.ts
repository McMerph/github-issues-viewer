import IIssuesPage from "./entities/IIssuesPage";
import IReposPage from "./entities/IReposPage";
import IUser from "./entities/IUser";

export default interface IStore {
  issues: IIssuesPage[];
  user: IUser;
  repos: IReposPage[];
}
