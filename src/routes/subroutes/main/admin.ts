import express, { Express, Request, Response, IRouter, IRoute } from "express";
import { Queue, Worker, QueueEvents } from "bullmq";

import { queueNames } from "../../../namespaces";

const connection = {
  host: "127.0.0.1",
  port: 6379,
};

const wsQueue = new Queue(queueNames.wsQueue, { connection });
const Lily_MsgQueue = new Queue(queueNames.DGB.Lily.msgCache, { connection });

const { createBullBoard } = require("@bull-board/api");
// const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { BullMQAdapter } = require("@bull-board/api/bullMQAdapter");
const { ExpressAdapter } = require("@bull-board/express");

type Req = Request;
type Res = Response;

class MainRouter_Admin {
  public router: IRouter;
  constructor() {
    this.router = express.Router();
    this.router.get("/", this.adminPanel);
    this.router.get("/files", this.files);
    this.router.get("/console", this.console);

    const serverAdapter = new ExpressAdapter();

    serverAdapter.setBasePath("/admin/bullmq");

    const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard(
      {
        queues: [new BullMQAdapter(wsQueue), new BullMQAdapter(Lily_MsgQueue)],
        serverAdapter: serverAdapter,
      }
    );

    const app = express();

    this.router.use("/bullmq", serverAdapter.getRouter());
  }

  adminPanel(req: Req, res: Res): IRoute {
    res.render("admin/index", {
      title: ``,
      chatTarget: req.params.usrname,
    });
    return;
  }
  files(req: Req, res: Res): IRoute {
    res.render("admin/files", {
      title: ``,
      chatTarget: req.params.usrname,
    });
    return;
  } 
  console(req: Req, res: Res): IRoute {
    res.render("admin/console", {
      title: ``,
      chatTarget: req.params.usrname,
    });
    return;
  }
}

const MainRoutes_Admin = new MainRouter_Admin().router;
export default MainRoutes_Admin;
