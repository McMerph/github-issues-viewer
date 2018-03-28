import IReposRequest from "./IReposRequest";

const equalsReposRequests = (request1: IReposRequest, request2: IReposRequest): boolean => {
  return request1.login === request2.login &&
    request1.pageNumber === request2.pageNumber &&
    request1.perPage === request2.perPage;
};

export default equalsReposRequests;
