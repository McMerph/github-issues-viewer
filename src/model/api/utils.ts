import IResponseParameters from "./IResponseParameters";
import NotModified from "./NotModified";

const getRequestInit = (requestETag?: string): RequestInit => {
  return {
    headers: getRequestHeaders(requestETag),
    method: "get",
  };
};

const getRequestHeaders = (requestETag?: string): HeadersInit => {
  let requestHeaders: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (requestETag) {
    requestHeaders = { ...requestHeaders, "If-None-Match": requestETag };
  }

  return requestHeaders;
};

const getQueryParams = (pageNumber: number, perPage: number): string => {
  return `?page=${pageNumber}&per_page=${perPage}`;
};

const handleResponse = (response: Response): IResponseParameters => {
  let eTag: string | undefined;
  let link: string | undefined;
  let errorStatus: number | undefined;
  let errorStatusText: string | undefined;

  if (response.ok) {
    eTag = response.headers.get("etag") || "";
    link = response.headers.get("link") || undefined;
  } else if (response.status === 304) {
    // TODO It is not an error
    throw new NotModified();
  } else {
    errorStatus = response.status;
    errorStatusText = response.statusText;
  }

  return { eTag, errorStatus, errorStatusText, link };
};

const getError = (json: any, responseParameters: IResponseParameters): Error => {
  if (responseParameters.errorStatus && responseParameters.errorStatusText) {
    return new Error("Network response was not ok. " +
      responseParameters.errorStatus + " " + responseParameters.errorStatusText + " " +
      JSON.stringify(json));
  } else {
    return new Error("Invalid format");
  }
};

export { getRequestInit, getQueryParams, handleResponse, getError };
