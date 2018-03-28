import IIssuesRequest, { isIssuesRequest } from "./entities/issues/IIssuesRequest";
import IReposRequest, { isReposRequest } from "./entities/repos/IReposRequest";

const equalsIssuesRequests = (request1: IIssuesRequest, request2: IIssuesRequest): boolean => {
  if (isIssuesRequest(request1)) {
    return request1.login === request2.login &&
      request1.repo === request2.repo &&
      request1.pageNumber === request2.pageNumber &&
      request1.perPage === request2.perPage;
  } else {
    return false;
  }
};

// TODO Rename to request1, request2
const equalsReposSettings = (cachedSettings: {}, request2: IReposRequest): boolean => {
  if (isReposRequest(cachedSettings)) {
    return cachedSettings.login === request2.login &&
      cachedSettings.perPage === request2.perPage;
  } else {
    return false;
  }
};

export { equalsIssuesRequests, equalsReposSettings };
