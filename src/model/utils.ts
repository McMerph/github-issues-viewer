import IIssuesSettings, { isIssuesSettings } from "./entities/IIssuesSettings";

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

export default equalsIssuesSettings;
