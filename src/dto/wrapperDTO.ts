import { Send } from "express-serve-static-core";
import { Response } from "express";

interface WrapperResponse<T> {
  data: T | null;
  error: {
    errorCode: number;
    errorMessage: string | unknown;
  };
  info: {
    timeStart: string;
    timeComplete: string;
    completionTime: string;
  };
}

interface TypedResponse<ResBody> extends Response {
  json: Send<ResBody, this>;
}

interface TypedRequestBody<T> extends Express.Request {
  body: T;
}

interface TypedRequestParams<T> extends Express.Request {
  params: T;
}

export { WrapperResponse, TypedResponse, TypedRequestBody, TypedRequestParams };
