import IIssues from "./entities/issues/IIssues";
import IRepos from "./entities/repos/IRepos";
import IUser from "./entities/IUser";

export default interface IStore {
  issues: IIssues;
  user: IUser;
  repos: IRepos;
}
