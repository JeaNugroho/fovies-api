# Fovies API
The back-end routes for Fovies.\
\
This is done using the Serverless framework, and thus the routes' configurations can be displayed in the file serverless.yml.\
serverless.yml defines the routes as endpoints, and the endpoints definitions are laid out within the root of this project.\
These definitions are RESTfu AWS Lambda functions, which runs on AWS containers since we do not manage any server for back-end routes.\
\
The libs directory contains the dynamodb connection and the error handling for the different endpoints.\
The mocks directory has the tests for our endpoints.\
\
\
The AWS DynamoDB, S3, and Cognito, are manually created in the console. They are used for storing video/movie info/details (DynamoDB), store the movie files (S3), and handle authentication and authorization (Cognito), respectively.\
The DynamoDB has a partition configuration (primary key: userId, sorting key: videoId) with several other fields (movieKey, posterUrl, createdAt, and gravatarUrl). The movieKey is used to get the file from S3.\
The back-end only deals with the DynamoDB part. The S3 and Cognito parts are handled in the front-end side through AWS Amplify.