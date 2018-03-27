import { connect } from "react-redux";
import { Dispatch } from "redux";
import actionCreator from "../../../model/actionCreator";
import IIssuesRequest from "../../../model/entities/issues/IIssuesRequest";
import IStore from "../../../model/IStore";
import App, { IDispatchFromProps, IStateFromProps } from "./App";

const mapStateToProps: (store: IStore) => IStateFromProps = (store) => store;

const mapDispatchToProps: (dispatch: Dispatch<IStore>) => IDispatchFromProps = (dispatch) => ({
  actions: {
    onRetrieveIssues: (request: IIssuesRequest) =>
      dispatch(actionCreator.retrieveIssues(request)),
    onRetrieveUser: (login: string) =>
      dispatch(actionCreator.retrieveUser(login)),
    onRetrieveRepos: (login: string) =>
      dispatch(actionCreator.retrieveRepos(login)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
