import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
  const params = {
    TableName: process.env.tableName
  };

  const result = await dynamoDb.scan(params);
  const resultVideo = result.Items.find(vid => {
      return vid.videoId === event.pathParameters.id;
  });

  // Return the retrieved item
  return resultVideo;
});
