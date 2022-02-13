import { createServer, Model } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    models: {
      device: Model,
      smartDeviceDetails: Model,
    },
    routes() {
      this.namespace = "api";

      this.get("/devices", (schema, request) => {
        return schema.devices.all();
      });
      this.get("/devices/:id", (schema, request) => {
        let id = request.params.id;
        return schema.devices.find(id);
      });
      // this.get("/devices/:id", (schema, request) => {
      //   let id = request.params.id
      //   return {
      //     SmartBulb: {
      //       type: "bulb",
      //       id: "1",
      //       name: "string",
      //       connectionState: "string",
      //       isTurnedOn: "boolean",
      //       brightness: "number",
      //       color: "string",
      //     },
      //     SmartOutlet: {
      //       type: "bulb",
      //       id: "string",
      //       name: "string",
      //       connectionState: "string",
      //       isTurnedOn: "boolean",
      //       brightness: "number",
      //       color: "string",
      //     },
      //     SmartTemperatureSensor: {
      //       type: "bulb",
      //       id: "string",
      //       name: "string",
      //       connectionState: "string",
      //       isTurnedOn: "boolean",
      //       brightness: "number",
      //       color: "string",
      //     },
      //   };
      //   return schema.movies.find(id)
      // });
    },
    seeds(server) {
      server.create("device", {
        type: "bulb",
        name: "Living room bulb",
        connectionState: "connected",
        isTurnedOn: false,
        brightness: "number",
        color: "f1f1f1",
      });
      server.create("device", {
        type: "outlet",
        name: "Living room outlet",
        connectionState: "disconnected",
        isTurnedOn: true,
        powerConsumption: 10,
      });
      server.create("device", {
        type: "temperatureSensor",
        name: "Main tempSensor",
        connectionState: "poorConnection",
        temperature: 20,
      });
    },
    // seeds(server) {
    //   server.create("smartDeviceDetail", {
    //     type: "bulb",
    //     name: "Living room bulb",
    //     connectionState: "connected",
    //     isTurnedOn: "false",
    //     brightness: "number",
    //     color: "f1f1f1",
    //   });
    //   server.create("smartDeviceDetail", {
    //     type: "outlet",
    //     name: "Living room outlet",
    //     connectionState: "disconnected",
    //     isTurnedOn: "true",
    //     powerConsumption: 10,
    //   });
    //   server.create("smartDeviceDetail", {
    //     type: "temperatureSensor",
    //     name: "Main tempSensor",
    //     connectionState: "poorConnection",
    //     temperature: 20,
    //   });
    // },
  });
  return server;
}
