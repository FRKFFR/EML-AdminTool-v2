import { NextFunction, Router, Request, Response } from 'express'
import { DefaultHttpResponse } from '../../../shared/types/responses/http/default-http-response'
import { Route } from '../services/route.model'
import Configure from '../controllers/configure.controller'
import { ControllerException } from '../responses/types'

export default class ConfigureRouter implements Route {
  path = '/configure'
  router = Router()

  constructor() {
    this.init()
  }

  private init() {
    /**
     * @openapi
     * /configure/check:
     *   get:
     *     tags:
     *       - Configuration
     *     summary: If needs to configure
     *     responses:
     *       200:
     *         description: Needs to configure
     */
    this.router.get(`${this.path}/check`, async (req: Request, res: Response<DefaultHttpResponse>, next: NextFunction) => {
      try {
        const resp = await new Configure().check(req)
        res.status(resp.httpStatus).send({ code: resp.code, message: resp.message })
      } catch (err: any) {
        res.status(err.httpStatus).send({ code: err.code, message: err.message })
      }
    })

    /**
     * @openapi
     * /configure/language:
     *   put:
     *     tags:
     *       - Configuration
     *     security:
     *       - basic: []
     *       - bearer: []
     *     summary: Configure language
     *     requestBody:
     *       required: true
     *       content:
     *         application/x-www-form-urlencoded:
     *           schema:
     *             type: object
     *             properties:
     *               language:
     *                 type: string
     *     responses:
     *       200:
     *         description: Password set
     *       401:
     *         description: Unauthorized
     */
    this.router.put(`${this.path}/language`, async (req: Request, res: Response<DefaultHttpResponse>, next: NextFunction) => {
      try {
        const resp = await new Configure().language(req, req.body)
        res.status(resp.httpStatus).send({ code: resp.code, message: resp.message })
      } catch (err: any) {
        res.status(err.httpStatus).send({ code: err.code, message: err.message })
      }
    })

    /**
     * @openapi
     * /configure/database:
     *   put:
     *     tags:
     *      - Configuration
     *     security:
     *       - basic: []
     *       - bearer: []
     *     summary: Configure Database
     *     requestBody:
     *       required: true
     *       content:
     *         application/x-www-form-urlencoded:
     *           schema:
     *             type: object
     *             properties:
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Password set
     *       401:
     *         description: Unauthorized
     */
    this.router.put(`${this.path}/database`, async (req: Request, res: Response<DefaultHttpResponse>, next: NextFunction) => {
      try {
        const resp = await new Configure().database(req, req.body)
        res.status(resp.httpStatus).send({ code: resp.code, message: resp.message })
      } catch (err: any) {
        res.status(err.httpStatus).send({ code: err.code, message: err.message })
      }
    })

    /**
     * @openapi
     * /configure/admin:
     *   put:
     *     tags:
     *      - Configuration
     *     security:
     *       - basic: []
     *       - bearer: []
     *     summary: Configure the admin account of the server
     *     requestBody:
     *       required: true
     *       content:
     *         application/x-www-form-urlencoded:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Password set
     *       401:
     *         description: Unauthorized
     */
    this.router.put(`${this.path}/admin`, async (req: Request, res: Response<DefaultHttpResponse>, next: NextFunction) => {
      try {
        const resp = await new Configure().admin(req, req.body)
        res.status(resp.httpStatus).send({ code: resp.code, message: resp.message })
      } catch (err: any) {
        res.status(err.httpStatus).send({ code: err.code, message: err.message })
      }
    })

    /**
     * @openapi
     * /configure/reset:
     *   delete:
     *     tags:
     *      - Configuration
     *     security:
     *       - bearer: []
     *     summary: Reset EML AdminTool
     *     responses:
     *       200:
     *         description: Reset
     *       401:
     *         description: Unauthorized
     */
    this.router.delete(`/reset`, async (req: Request, res: Response<DefaultHttpResponse>, next: NextFunction) => {
      try {
        const resp = await new Configure().reset(req, req.headers)
        res.status(resp.httpStatus).send({ code: resp.code, message: resp.message })
      } catch (err: any) {
        res.status(err.httpStatus).send({ code: err.code, message: err.message })
      }
    })
  }
}
