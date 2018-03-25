import IIssuesList from "./entities/IIssuesList";
import IReposPage from "./entities/IReposPage";
import IUser from "./entities/IUser";

export default interface IStore {
  issues: IIssuesList;
  user: IUser;
  repos: IReposPage[];
}
