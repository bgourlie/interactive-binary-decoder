import * as ReactDOMServer from "react-dom/server";
import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import { rootElement } from "./app";
import { StyleSheetServer } from "aphrodite/no-important";
import * as AWS from "aws-sdk";
import * as cheerio from "cheerio";
import getSettings from "./settings";

// We inject the s3 dependency because we don't want to bundle the aws-sdk, we want the version that is supplied by AWS
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
      .then(data => {
        if (!data.Body) {
          throw new Error("Empty body returned when requesting root.html");
        }

        const appMarkup = data.Body.toString();

        const body = StyleSheetServer.renderStatic(() =>
          ReactDOMServer.renderToString(rootElement())
        );

        const $ = cheerio.load(appMarkup);
        $("#app-container").append(body.html);
        $("style[data-aphrodite]").append(body.css.content);
        const response = {
          statusCode: 200,
          headers: {
            "Content-Type": "text/html"
          },
          body: $.xml()
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
