import IIssues from "./entities/issues/IIssues";
import IRepos from "./entities/repos/IRepos";

export default interface IStore {
  issues: IIssues;
  repos: IRepos;
}
