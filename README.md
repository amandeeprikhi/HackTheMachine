# HackTheMachine 2019

##### Alpha Store by SoftWidget Co.

- Purpose
This project uses Alexa voice UI and using voice commands enables the user to make a purchase, modify existing order on Alpha Store.

- Instructions to Clone and Deloy: 
    - Initialize ASK-CLI using below comamnd with given credentials.
        ```ask init```
        **User name-** Cgteam4@gmail.com
        **Password-** N0id@123
        **Access Key ID-** AKIA2IBYINGQQIXWBPT3
        **Secret Access Key-** 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 
        **Console Login Link-** https://704492628385.signin.aws.amazon.com/console
    - Clone using ASK-CLI with following command
        ```ask clone -s <amzn1.ask.skill.e847c4ff-78a0-425c-8c24-79e0e803d587>```
    - Execute ```ask deploy``` to deploy the skill


- Technology Stack
    - Node.js for Lambda function
        **Why:** Familiarity of team members with basic javascript then C#.
    - AWS Lambda for code hosting
        **Why:** Easier to deploy Alexa skills as end point implementation is simple.
    - AWS DynamoDB for storing data.
        **Why:** Native support in Node.js and AWS Lambda to interact with DynamoDB
    - ASK-CLI for deoployment and development
        **Why:** Official CLI for deployments

