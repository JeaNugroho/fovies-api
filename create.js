import * as uuid from "uuid";
import dateFormat from "dateformat";
// import AWS from "aws-sdk";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = handler(async (event, context) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  let now = new Date();

  const params = {
    TableName: process.env.tableName,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'videoId': a unique uuid
    // - 'title': parsed from request body
    // - 'description': parsed from request body
    // - 'movie': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      videoId: uuid.v1(),
      title: data.title,
      description: data.description,
      movieKey: data.movieKey,
      posterUrl: data.posterUrl,
      avatar: data.avatar,
      createdAt: dateFormat(now, "mediumDate")
    }
  };

  await dynamoDb.put(params);

  return params.Item;
});