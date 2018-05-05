import * as ReactDOMServer from "react-dom/server";
import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import { rootElement } from "./app";
import { StyleSheetServer } from "aphrodite/no-important";

export const ssr: Handler = (
  event: APIGatewayEvent,
  context?: Context,
  cb?: Callback
) => {
  const body = StyleSheetServer.renderStatic(() =>
    ReactDOMServer.renderToString(rootElement())
  );

  const response = {
    statusCode: 200,
    body: body
  };

  if (cb) {
    cb(null, response);
  }
};
