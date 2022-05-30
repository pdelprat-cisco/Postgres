"use strict";
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");

const appName = 'pdelprat-postgres';

const cluster = new awsx.ecs.Cluster(`${appName}-cluster`);

const lb = new awsx.lb.NetworkListener(`${appName}-lb`, {
  port: 5432,
});

let service = new awsx.ecs.FargateService(`${appName}-fargate`, {
  cluster,
  desiredCount: 1,
  taskDefinitionArgs: {
    containers: {
      postgres: {
        image: awsx.ecs.Image.fromPath(`${appName}-image`, './app'),
        memory: 512,
        portMappings: [lb],
      },
    },
  },
});

// Catch the zoneId for my created domain dp-tuto.com
const dpTutoZone = aws.route53.getZone({
  name: 'dp-tuto.com.',
  privateZone: false,
});

// Create a alias to use a human readable fqdn on my personal domain
const record = new aws.route53.Record(`${appName}-route`, {
  zoneId: dpTutoZone.then((dpTutoZone) => dpTutoZone.zoneId),
  name: `${appName}.dp-tuto.com`,
  type: 'A',
  aliases: [
    {
      name: lb.endpoint.hostname,
      zoneId: 'Z1CMS0P5QUZ6D5', // Hardcoded zoneId, not found a way to catch it with Pulumi, found here https://docs.aws.amazon.com/general/latest/gr/elb.html
      evaluateTargetHealth: true,
    },
  ],
});

exports.frontendURL = pulumi.interpolate`http://${lb.endpoint.hostname}/`;


