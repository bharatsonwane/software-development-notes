# AWS

Notes for Amazon Web Services — core services and common architectures.

Files are numbered in **learning order**: `01-aws-topic.md`, `02-aws-topic.md`, and so on.

**Prerequisite:** [Docker](../docker/) basics and [System Design](../system-design/) fundamentals (01–03) help from file 06 onward.

## Contents

**01. [Cloud & AWS Overview](./01-aws-cloud-overview.md)**  
Tier — Fundamental

1. Cloud computing models (IaaS, PaaS, SaaS)  
2. AWS global infrastructure — regions, AZs  
3. AWS account and console  
4. Free tier and billing basics  
5. Common questions

**02. [IAM & Security](./02-aws-iam-security.md)**  
Tier — Fundamental

1. Users, groups, roles  
2. Policies and least privilege  
3. Access keys vs roles  
4. MFA (intro)  
5. Common questions

**03. [EC2 & Compute](./03-aws-ec2-compute.md)**  
Tier — Fundamental

1. Instances and AMIs  
2. Security groups  
3. SSH and key pairs  
4. Auto Scaling (intro)  
5. Common questions

**04. [S3 & Storage](./04-aws-s3-storage.md)**  
Tier — Fundamental

1. Buckets and objects  
2. Storage classes  
3. Static website hosting  
4. Presigned URLs  
5. Common questions

**05. [VPC & Networking](./05-aws-vpc-networking.md)**  
Tier — Intermediate

1. VPC, subnets, route tables  
2. Internet gateway and NAT  
3. Public vs private subnets  
4. Security groups vs NACLs  
5. Common questions

**06. [RDS & Databases](./06-aws-rds-databases.md)**  
Tier — Intermediate

1. RDS vs self-managed on EC2  
2. Multi-AZ and read replicas  
3. DynamoDB (overview)  
4. Backups and snapshots  
5. Common questions

**07. [Lambda & Serverless](./07-aws-lambda-serverless.md)**  
Tier — Intermediate

1. Function-as-a-Service model  
2. Triggers and event sources  
3. Cold starts and limits  
4. Lambda + API Gateway pattern  
5. Common questions

**08. [API Gateway & Load Balancing](./08-aws-api-gateway-alb.md)**  
Tier — Intermediate

1. Application Load Balancer  
2. API Gateway REST vs HTTP  
3. Routing and throttling  
4. TLS and custom domains (intro)  
5. Common questions

**09. [CloudWatch & Monitoring](./09-aws-cloudwatch-monitoring.md)**  
Tier — Intermediate

1. Metrics and alarms  
2. Logs and Log Insights  
3. Dashboards  
4. SNS notifications (intro)  
5. Common questions

**10. [Deployment Patterns](./10-aws-deployment-patterns.md)**  
Tier — Advanced

1. EC2 + Docker deploy  
2. Elastic Beanstalk (overview)  
3. ECS / Fargate (overview)  
4. CI/CD with CodePipeline (intro)  
5. Common questions

**11. [Well-Architected & Cost](./11-aws-well-architected-cost.md)**  
Tier — Advanced

1. Six pillars (overview)  
2. Cost Explorer and budgets  
3. Reserved vs on-demand  
4. Tagging strategy  
5. Common questions

**12. [Common Architectures](./12-aws-common-architectures.md)**  
Tier — Advanced

1. Static site — S3 + CloudFront  
2. Three-tier web app  
3. Serverless API  
4. Interview-style AWS questions  
5. Common questions

## Learning path

```
01–04  Fundamental  →  IAM, EC2, S3
05–09  Intermediate →  VPC, RDS, Lambda, monitoring
10–12  Advanced     →  deployment, cost, reference architectures
```

Each file uses **relative** section numbers (`1.`, `1.1.`, `1.1.1.` within that file).

## Related notes

| Topic | Location |
|-------|----------|
| Docker & containers | [../docker/](../docker/) |
| System design | [../system-design/](../system-design/) |
| Node deployment | [../javascript/nodejs/](../javascript/nodejs/) |
