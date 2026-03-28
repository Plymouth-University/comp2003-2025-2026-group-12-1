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