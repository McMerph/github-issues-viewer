import IIssues from "./entities/IIssues";
import IRepos from "./entities/IRepos";
import IUser from "./entities/IUser";

export default interface IStore {
  issues: IIssues;
  user: IUser;
  repos: IRepos;
}
