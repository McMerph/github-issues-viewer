import ActionType from "../actions/ActionType";
import ApiState from "../entities/ApiState";
import IUser from "../entities/IUser";
import { user } from "./user";
import ISetUserAction from "../actions/ISetUserAction";
import IAction from "../actions/IAction";

describe("user() is a reducer for current user", () => {
  test("user() instantiated with correct initial state", () => {
    // Given
    const action: IAction = {
      type: ActionType.SetUser,
    };

    // When
    const state: IUser = user(undefined, action);

    // Then
    expect(state).toEqual({ apiState: ApiState.Idle });
  });

  test("user() correctly handle apiState change", () => {
    // Given
    const setUserAction: ISetUserAction = {
      type: ActionType.SetUser,
      user: { apiState: ApiState.Error },
    };

    // When
    const state: IUser = user(undefined, setUserAction);

    // Then
    expect(state).toEqual({ apiState: ApiState.Error });
  });

  test("user() correctly set user fields", () => {
    // Given
    const userState: IUser = {
      apiState: ApiState.Success,
      avatarUrl: "https://picsum.photos/200/300/?random",
      eTag: "Loremipsumdolorsitamet,consecteturadipisicingelit.Culpalaudantium",
      login: "NamelessOne",
    };
    const setUserAction: ISetUserAction = {
      type: ActionType.SetUser,
      user: userState,
    };

    // When
    const state: IUser = user(undefined, setUserAction);

    // Then
    expect(state).toEqual({
      apiState: ApiState.Success,
      ...userState,
    });
  });
});
