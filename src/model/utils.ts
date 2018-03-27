import IIssuesSettings, { isIssuesSettings } from "./entities/IIssuesSettings";
import IReposSettings, { isReposSettings } from "./entities/IReposSettings";

// TODO Rename to setings1, settings2
const equalsIssuesSettings = (cachedSettings: {}, settings: IIssuesSettings): boolean => {
  if (isIssuesSettings(cachedSettings)) {
    return cachedSettings.login === settings.login &&
      cachedSettings.repo === settings.repo &&
      cachedSettings.pageNumber === settings.pageNumber &&
      cachedSettings.perPage === settings.perPage;
  } else {
    return false;
  }
};

const equalsReposSettings = (cachedSettings: {}, settings: IReposSettings): boolean => {
  if (isReposSettings(cachedSettings)) {
    return cachedSettings.login === settings.login &&
      cachedSettings.perPage === settings.perPage;
  } else {
    return false;
  }
};

export { equalsIssuesSettings, equalsReposSettings };
