import { Router, Request } from "express";
import { PrismaClient } from "@prisma/client";
import { RequestDummyByID, ResponseDummy } from "../dto/dummyDTO";
import {
  TypedRequestParams,
  TypedResponse,
  WrapperResponse,
} from "../dto/wrapperDTO";
import {
  generateErrorResponse,
  generateNotFoundErrorResponse,
  generateSuccessResponse,
} from "../util/responseUtils";

const router: Router = Router();
const prisma = new PrismaClient();

/**
 * @openapi
 * /user:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Returns a mysterious string
 */
router.get(
  "/",
  async (_: Request, res: TypedResponse<WrapperResponse<ResponseDummy[]>>) => {
    try {
      const dummies = await prisma.dummy.findMany();
      generateSuccessResponse(res, dummies);
    } catch (error) {
      generateErrorResponse(res, error);
    }
  },
);

/**
 * @openapi
 * /user/{id}:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get(
  "/:id",
  async (
    req: TypedRequestParams<RequestDummyByID>,
    res: TypedResponse<WrapperResponse<ResponseDummy>>,
  ) => {
    try {
      const id = Number(req.params.id);

      const dummy = await prisma.dummy.findUnique({
        where: {
          id: id,
        },
      });
      if (dummy) {
        generateSuccessResponse(res, dummy);
      } else {
        generateNotFoundErrorResponse(res);
      }
    } catch (error) {
      generateErrorResponse(res, error);
    }
  },
);

export default router;
