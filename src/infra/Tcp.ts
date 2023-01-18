import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";

import { IService } from "types/servises";

import { controllers } from "app/domain";

export class Tcp implements IService {
  private static instance: Tcp;

  private routePrefix = "/api";
  private server = express();

  constructor() {
    if (!Tcp.instance) {
      Tcp.instance = this;
    }
    return Tcp.instance;
  }
  async init(): Promise<void> {
    const { server, routePrefix } = this;
    useExpressServer(server, {
      routePrefix,
      controllers,
      cors: true,
      defaultErrorHandler: true,
    });

    return new Promise((resolve: any) => {
      server.listen(4000, () => {
        console.log("Tcp service started on port 4000");
        return resolve(true);
      });
    });
  }
}
