import * as ReactDOMServer from 'react-dom/server';
import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";

export const hello: Handler = (
  event: APIGatewayEvent,
  context?: Context,
  cb?: Callback
) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message:
        "Go Serverless Webpack (Typescript) v1.0! Your UPDATED function executed successfully!",
      input: event
    })
  };

  if (cb) {
    cb(null, response);
  }
};
