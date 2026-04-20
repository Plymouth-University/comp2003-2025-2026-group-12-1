variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
}

variable "project_name" {
  description = "Project name used for resource naming"
  type        = string
}

variable "environment" {
  description = "Deployment environment name"
  type        = string
}

variable "vpc_cidr" {
  description = "CIDR block for the production VPC"
  type        = string
}

variable "subnet_a_cidr" {
  description = "CIDR block for Subnet A"
  type        = string
}

variable "subnet_b_cidr" {
  description = "CIDR block for Subnet B"
  type        = string
}

variable "az_a" {
  description = "Primary availability zone"
  type        = string
}

variable "az_b" {
  description = "Secondary availability zone"
  type        = string
}

variable "frontend_bucket_name" {
  description = "Name of the S3 bucket for static frontend assets"
  type        = string
}

variable "training_data_bucket_name" {
  description = "Name of the S3 bucket for training data"
  type        = string
}

variable "model_storage_bucket_name" {
  description = "Name of the S3 bucket for model storage"
  type        = string
}