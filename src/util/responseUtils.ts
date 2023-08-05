import { Response } from "express";

const generateSuccessResponse = <t>(
  res: Response,
  data: t | null,
  timeStart: string,
  timeComplete: string,
  completionTime: string,
): void => {
  res.json({
    data,
    error: {
      errorcode: 200,
      errormessage: "ok",
    },
    info: {
      timeStart,
      timeComplete,
      completionTime,
    },
  });
};

const generateErrorResponse = (
  res: Response,
  errorMessage: string | unknown,
  timeStart: string,
  timeComplete: string,
  completionTime: string,
): void => {
  res.json({
    data: null,
    error: {
      errorCode: 500,
      errorMessage,
    },
    info: {
      timeStart,
      timeComplete,
      completionTime,
    },
  });
};

const generateNotFoundErrorResponse = (
  res: Response,
  timeStart: string,
  timeComplete: string,
  completionTime: string,
): void => {
  res.json({
    data: null,
    error: {
      errorCode: 404,
      errorMessage: "Data Not Found",
    },
    info: {
      timeStart,
      timeComplete,
      completionTime,
    },
  });
};

export {
  generateSuccessResponse,
  generateErrorResponse,
  generateNotFoundErrorResponse,
};
