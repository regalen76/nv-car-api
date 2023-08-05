import { Response } from "express";

const generateSuccessResponse = <t>(res: Response, data: t | null): void => {
  res.json({
    data,
    error: {
      errorcode: 200,
      errormessage: "ok",
    },
  });
};

const generateErrorResponse = (
  res: Response,
  errorMessage: string | unknown,
): void => {
  res.json({
    data: null,
    error: {
      errorCode: 500,
      errorMessage,
    },
  });
};

const generateNotFoundErrorResponse = (res: Response): void => {
  res.json({
    data: null,
    error: {
      errorCode: 404,
      errorMessage: "Data Not Found",
    },
  });
};

export {
  generateSuccessResponse,
  generateErrorResponse,
  generateNotFoundErrorResponse,
};
