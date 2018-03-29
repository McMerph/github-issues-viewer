import IIssuesRequest from "./IIssuesRequest";

const equalsIssuesRequests = (request1: IIssuesRequest, request2: IIssuesRequest): boolean => {
  return request1.login === request2.login &&
    request1.pageNumber === request2.pageNumber &&
    request1.perPage === request2.perPage &&
    request1.repo === request2.repo;
};

export default equalsIssuesRequests;
