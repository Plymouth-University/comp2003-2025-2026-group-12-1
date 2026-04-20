aws_region   = "us-east-1"
project_name = "final-cloud-architecture"
environment  = "prod"

vpc_cidr      = "10.0.0.0/16"
subnet_a_cidr = "10.0.1.0/24"
subnet_b_cidr = "10.0.2.0/24"

az_a = "us-east-1a"
az_b = "us-east-1b"

frontend_bucket_name      = "final-cloud-architecture-prod-frontend-assets"
training_data_bucket_name = "final-cloud-architecture-prod-training-data"
model_storage_bucket_name = "final-cloud-architecture-prod-model-storage"

db_name     = "appdb"
db_username = "adminuser"
db_password = "ChangeThisToAStrongPassword123!"