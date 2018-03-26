import { connect } from "react-redux";
import { Dispatch } from "redux";
import actionCreator from "../../../model/actionCreator";
import IStore from "../../../model/IStore";
import App, { IDispatchFromProps, IStateFromProps } from "./App";
import IIssuesSettings from "../../../model/entities/IIssuesSettings";

const mapStateToProps: (store: IStore) => IStateFromProps = (store) => store;

const mapDispatchToProps: (dispatch: Dispatch<IStore>) => IDispatchFromProps = (dispatch) => ({
  actions: {
    onRetrieveIssues: (parameters: IIssuesSettings) =>
      dispatch(actionCreator.retrieveIssues(parameters)),
    onRetrieveUser: (login: string) =>
      dispatch(actionCreator.retrieveUser(login)),
    onRetrieveRepos: (login: string) =>
      dispatch(actionCreator.retrieveRepos(login)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
