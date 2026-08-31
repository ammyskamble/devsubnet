import { onRequest as __api_collect_js_onRequest } from "D:\\Testing\\Devsubnet\\Devsubnet.com\\functions\\api\\collect.js"
import { onRequest as __api_telemetry_js_onRequest } from "D:\\Testing\\Devsubnet\\Devsubnet.com\\functions\\api\\telemetry.js"

export const routes = [
    {
      routePath: "/api/collect",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_collect_js_onRequest],
    },
  {
      routePath: "/api/telemetry",
      mountPath: "/api",
      method: "",
      middlewares: [],
      modules: [__api_telemetry_js_onRequest],
    },
  ]