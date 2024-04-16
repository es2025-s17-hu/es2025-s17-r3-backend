import express from "express";
export type { Request, Response } from "express";
export {body, param, validationResult} from "express-validator";

export const createRouter = () => express.Router();

