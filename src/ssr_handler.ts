import * as ReactDOMServer from "react-dom/server";
import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import { rootElement } from "./app";
import { StyleSheetServer } from "aphrodite/no-important";
import * as AWS from "aws-sdk";
import getSettings from "./settings";

export const ssr: (s3: AWS.S3) => Handler = (s3: AWS.S3) => {
  return (event: APIGatewayEvent, context?: Context, cb?: Callback) => {
    const settings = getSettings();
    const params = {
      Bucket: settings.staticAssetsS3Bucket,
      Key: "root.html"
    };

    s3
      .getObject(params)
      .promise()
      .then((data: any) => {
        console.log(data);

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
      })
      .catch((e: any) => {
        throw e;
      });
  };
};
