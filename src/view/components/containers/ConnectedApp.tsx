import { connect } from "react-redux";
import { Dispatch } from "redux";
import actionCreator from "../../../model/actionCreator";
import IStore from "../../../model/IStore";
import App, { IDispatchFromProps, IStateFromProps } from "./App";
import { IRetrieveIssuesParameters } from "../../../model/api/retrieveIssues";

const mapStateToProps: (store: IStore) => IStateFromProps = (store) => store;

const mapDispatchToProps: (dispatch: Dispatch<IStore>) => IDispatchFromProps = (dispatch) => ({
  actions: {
    onRetrieveIssues: (parameters: IRetrieveIssuesParameters) =>
      dispatch(actionCreator.retrieveIssues(parameters)),
    onRetrieveUser: (login: string) =>
      dispatch(actionCreator.retrieveUser(login)),
    onRetrieveRepos: (login: string) =>
      dispatch(actionCreator.retrieveRepos(login)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
