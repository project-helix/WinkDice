import express, {
  Express,
  Request,
  Response,
  NextFunction,
  IRouter,
  IRoute,
} from "express";
import { AppDataSource as db } from "../../../data-source";
import { User } from "../../../entity/User";

import { bodyData } from "../../../types";

import { encrypt, isSame } from "../../../utils/bcrypt";

import { ValidateAuthenticity, getUser } from "../../../utils/validators";

type Req = Request;
type Res = Response;

class APIRouter_Users {
  public router: IRouter;
  constructor() {
    this.router = express.Router();
    this.router.get("/", this.Index);
    this.router.post("/create", this.CreateUser);
    this.router.post("/get", this.GetUser);
    this.router.post("/validate", this.CheckIdentity);
    this.router.post("/getRawData", this.getData);
    this.router.post("/setRawData", this.setData);
  }
  Index(req: Req, res: Res): IRoute {
    res.send("Hello World!");
    return;
  }
  async CreateUser(req: Req, res: Res) {
    const data = req.body.data
      ? req.body.data
      : {
          username: null,
          password: null,
          email: null,
        };
    const doesExist =
      (await getUser({ userName: data.username })) == null ? false : true;
    if (doesExist)
      return res.send({
        code: "Server:901:UserExistsInDatabase",
        shortcode: 901,
      });
    else {
      const user = new User();
      user.userName = data.username;
      user.displayName = data.username;
      user.userToken = makeid(32);
      user.password = encrypt(data.password);
      user.email = data.email;
      user.roles = ["default"];
      await db.manager.save(user);
      res.send({ code: "Server:101:UserCreated", shortcode: 101 });
    }

    // res.send({doesExist})
    //return res.send(JSON.stringify(data))
  }
  async GetUser(req: Req, res: Res) {
    const data = req.body.data
      ? req.body.data
      : {
          username: null,
          password: null,
          email: null,
        };
    const doesExist =
      (await getUser({ userName: data.username })) == null ? false : true;
    if (!doesExist)
      return res.send({ code: "Server:902:UserNotFound", shortcode: 902 });
    else {
      console.log(`In users.ts`, await getUser({ userName: data.username }))
      res.send({
        code: "Server:102:UserFound",
        shortcode: 102,
        data: { ...(await getUser({ userName: data.username })) },
      });
    }

    // res.send({doesExist})
    //return res.send(JSON.stringify(data))
  }
  async CheckIdentity(req: Req, res: Res) {
    const data = req.body.data
      ? req.body.data
      : {
          username: null,
          password: null,
          email: null,
          isEmail: false,
        };
    const dataP =
      data.isEmail === true
        ? { email: data.email }
        : { userName: data.username };
    const doesExist = (await getUser(dataP)) == null ? false : true;
    if (!doesExist)
      return res.send({ code: "Server:902:UserNotFound", shortcode: 902 });
    else {
      // res.send({code: "Server:102:UserFound", data: {...await getUser({userName: data.username})}})
      const expectedUser = await getUser(dataP);
      if (isSame(data.password, expectedUser.password))
        return res.send({
          code: "Server:103:UserPasswordMatches",
          shortcode: 103,
          userdata: { ...(await getUser(dataP)) },
        });
      else
        return res.send({
          code: "Server:903:UserPasswordDoesntMatch",
          shortcode: 903,
        });
    }

    // res.send({doesExist})
    //return res.send(JSON.stringify(data))
  }

  async getData(req: Req, res: Res) {
    const data = req.body.data;

    const neoData = {
      user: {
        name: req.cookies.UsrName,
        token: req.cookies.UsrToken,
      },
    };


    if ((await ValidateAuthenticity(neoData)) == false)
      return res.send({
        code: "Server:913:UserTokenDoesNotMatchUserName",
        shortcode: 913,
      });
    else {
      const retData = await getUser({ ...data });
      console.log(retData);
      return res.send(retData);
    }
  }
  async setData(req: Req, res: Res) {
    const data = req.body.data;
    console.log(data);
    const usrdat = JSON.parse(data);
    // const usrdat:any = data

    const usr = new User();
    usr.id = usrdat.id;
    usr.userToken = usrdat.userToken;
    usr.userName = usrdat.userName;
    usr.displayName = usrdat.displayName;
    usr.password = usrdat.password;
    usr.email = usrdat.email;
    usr.roles = usrdat.roles;
    usr.createdAt = usrdat.createdAt;
    await db.manager.save(usr);
    return res.send(await getUser({ userToken: usrdat.userToken }));
  }
}

const APIRoutes_Users = new APIRouter_Users().router;
export default APIRoutes_Users;

function makeid(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
