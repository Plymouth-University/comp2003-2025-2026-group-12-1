#Print VPC ID
output "vpc_id" {
  description = "ID of the main VPC"
  value       = aws_vpc.main.id
}

#Print Subnet A ID
output "subnet_a_id" {
  description = "ID of subnet A"
  value       = aws_subnet.subnet_a.id
}

#Print Subnet B ID
output "subnet_b_id" {
  description = "ID of subnet B"
  value       = aws_subnet.subnet_b.id
}

#Print Route table ID
output "private_route_table_id" {
  description = "ID of the private route table"
  value       = aws_route_table.private.id
}

#Print Frontend bucket name
output "frontend_bucket_name" {
  description = "Name of the frontend assets S3 bucket"
  value       = aws_s3_bucket.frontend_assets.bucket
}

#Print Training data bucket name
output "training_data_bucket_name" {
  description = "Name of the training data S3 bucket"
  value       = aws_s3_bucket.training_data.bucket
}

#Print Model storage bucket name
output "model_storage_bucket_name" {
  description = "Name of the model storage S3 bucket"
  value       = aws_s3_bucket.model_storage.bucket
}

#Print Gateway endpoint ID
output "s3_gateway_endpoint_id" {
  description = "ID of the S3 Gateway Endpoint"
  value       = aws_vpc_endpoint.s3_gateway.id
}

#Print EC2 security group ID
output "ec2_security_group_id" {
  description = "ID of the EC2 security group"
  value       = aws_security_group.ec2.id
}

#Print RDS security group ID
output "rds_security_group_id" {
  description = "ID of the RDS security group"
  value       = aws_security_group.rds.id
}

#Print Lambda security group ID
output "lambda_security_group_id" {
  description = "ID of the Lambda security group"
  value       = aws_security_group.lambda.id
}

#Print database subnet group name
output "db_subnet_group_name" {
  description = "Name of the DB subnet group"
  value       = aws_db_subnet_group.main.name
}

#Print Relational Database Service endpoint
output "rds_endpoint" {
  description = "RDS endpoint"
  value       = aws_db_instance.main.endpoint
}

#Print EC2 instance ID
output "ec2_instance_id" {
  description = "ID of the EC2 instance"
  value       = aws_instance.app.id
}

#Print EC2 private IP
output "ec2_private_ip" {
  description = "Private IP of the EC2 instance"
  value       = aws_instance.app.private_ip
}

#Print lambda function name
output "lambda_function_name" {
  description = "Name of the Lambda function"
  value       = aws_lambda_function.app.function_name
}