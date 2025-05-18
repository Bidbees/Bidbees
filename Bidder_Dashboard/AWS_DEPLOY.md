# Deploying BidderBuddy to AWS with Supabase

This guide outlines the steps to deploy the BidderBuddy application to AWS using Supabase as the database and storage solution.

## Prerequisites

- AWS Account
- Supabase Account
- Node.js v18+ and npm
- AWS CLI configured locally
- Mapbox Account with API token

## 1. Set up Supabase

### Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project
3. Note your project URL and API keys (anon key and service role key)

### Configure Database

The application uses Drizzle ORM for database migrations:

1. From your local development environment, update your `.env` file with Supabase credentials:
   ```
   DATABASE_URL=postgres://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres
   SUPABASE_URL=https://your-project-ref.supabase.co
   SUPABASE_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_KEY=your-supabase-service-key
   ```

2. Run database migrations:
   ```bash
   npm run db:migrate
   ```

### Configure Storage

1. In your Supabase dashboard, go to Storage
2. Create a new bucket called `bidbees-assets`
3. Set the bucket's privacy setting to "Public"
4. Update bucket policies to allow uploads from authenticated users

## 2. Set Up AWS Resources

### Create an Elastic Beanstalk Environment

1. Log in to AWS Console
2. Go to Elastic Beanstalk
3. Create a new application and environment
   - Choose Node.js platform
   - Configure environment variables (see below)

### Environment Variables to Configure

Configure these environment variables in your Elastic Beanstalk environment:

```
NODE_ENV=production
DATABASE_URL=postgres://postgres:your-password@db.your-project-ref.supabase.co:5432/postgres
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_SERVICE_KEY=your-supabase-service-key
VITE_MAPBOX_ACCESS_TOKEN=your-mapbox-token
MAPBOX_ACCESS_TOKEN=your-mapbox-token
SESSION_SECRET=your-secure-random-string
USE_DATABASE=true
```

### AWS S3 Configuration (Optional for Additional File Storage)

If you want to use S3 alongside Supabase for file storage:

1. Create an S3 bucket for application assets
2. Configure CORS for the bucket
3. Add these environment variables:
   ```
   AWS_REGION=your-aws-region
   AWS_ACCESS_KEY_ID=your-aws-access-key
   AWS_SECRET_ACCESS_KEY=your-aws-secret-key
   S3_BUCKET=your-s3-bucket-name
   ```

## 3. Build and Deploy the Application

### Prepare the Application

1. Update your production build configuration (if needed)
2. Build the application locally:
   ```bash
   npm run build
   ```

### Deploy to Elastic Beanstalk

1. Create a deployment package:
   ```bash
   zip -r deploy.zip . -x "node_modules/*" ".git/*"
   ```

2. Upload and deploy this package to your Elastic Beanstalk environment through the AWS Console or using the AWS CLI:
   ```bash
   aws elasticbeanstalk create-application-version --application-name BidderBuddy --version-label v1 --source-bundle S3Bucket=your-bucket,S3Key=deploy.zip
   aws elasticbeanstalk update-environment --environment-name BidderBuddy-env --version-label v1
   ```

## 4. Configure CloudFront (Optional)

For better performance and global distribution:

1. Create a CloudFront distribution pointing to your Elastic Beanstalk environment
2. Configure cache behaviors and TTLs appropriately
3. Set up a custom domain with SSL certificate

## 5. Set Up CI/CD (Optional)

For continuous deployment:

1. Create a GitHub Actions or AWS CodePipeline workflow
2. Configure it to build and deploy when changes are pushed to the main branch
3. Include steps for database migrations

## Troubleshooting

- **Database Connection Issues**: Ensure your Supabase IP allowlist includes the Elastic Beanstalk environment IPs
- **Deployment Failures**: Check Elastic Beanstalk logs for details
- **CORS Issues**: Verify CORS settings in Supabase and S3
- **Map Not Loading**: Check that your Mapbox token is correctly set in environment variables

## Security Considerations

- Use AWS Secrets Manager or Parameter Store for sensitive credentials
- Enable AWS WAF for the CloudFront distribution
- Set up proper IAM roles with minimal permissions
- Enable database encryption at rest in Supabase

## Monitoring and Maintenance

- Set up CloudWatch Alarms for monitoring application performance
- Configure log rotation and retention policies
- Create regular database backups in Supabase
- Set up health checks for your application