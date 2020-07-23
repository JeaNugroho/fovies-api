import * as uuid from "uuid";
// import AWS from "aws-sdk";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

// const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const main = handler(async (event, context) => {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.tableName,
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      videoId: uuid.v1(),
      title: data.title,
      description: data.description,
      movie: data.movie,
      createdAt: Date.now()
    }
  };

  await dynamoDb.put(params);

  return params.Item;
});