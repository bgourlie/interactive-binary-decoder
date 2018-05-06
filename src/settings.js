const serviceName = "wtfloat";
const stage = `${process.env.WTF_STAGE || "dev"}`;

module.exports = serverless => {
  if (serverless) {
    if (!process.env.WTF_STAGE) {
      serverless.cli.consoleLog(
        "WTF_STAGE environment variable not set. Falling back to dev."
      );
    }

    serverless.cli.consoleLog(`Deploying ${serviceName} ${stage} build`);
  }

  return {
    serviceName: serviceName,
    stage: stage,
    staticAssetsS3Bucket: `static-assets-for-${serviceName}-${stage}`
  };
};
