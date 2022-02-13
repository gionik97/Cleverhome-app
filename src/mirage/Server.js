import { createServer } from "miragejs";

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    routes() {
      this.namespace = "api";

      this.get("/devices", () => {
        return {
          SmartDevice: [
            {
              type: "bulb",
              id: "1",
              name: "Living room bulb",
              connectionState: "connected",
            },
            {
              type: "outlet",
              id: "2",
              name: "Living room outlet",
              connectionState: "disconnected",
            },
            {
              type: "temperatureSensor",
              id: "3",
              name: "Main temperatureSensor",
              connectionState: "poorConnection",
            },
          ],
        };
      });
      this.get("/devices/id", () => {
        return {
          SmartBulb: {
            type: "bulb",
            id: "1",
            name: "string",
            connectionState: "string",
            isTurnedOn: "boolean",
            brightness: "number",
            color: "string",
          },
          SmartOutlet: {
            type: "bulb",
            id: "string",
            name: "string",
            connectionState: "string",
            isTurnedOn: "boolean",
            brightness: "number",
            color: "string",
          },
          SmartTemperatureSensor: {
            type: "bulb",
            id: "string",
            name: "string",
            connectionState: "string",
            isTurnedOn: "boolean",
            brightness: "number",
            color: "string",
          },
        };
      });
    },
  });
  return server;
}
