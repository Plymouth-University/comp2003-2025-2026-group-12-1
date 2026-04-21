# Frontend assets bucket
resource "aws_s3_bucket" "frontend_assets" {
  bucket = var.frontend_bucket_name

  tags = {
    Name = "${var.project_name}-frontend-assets"
  }
}
resource "aws_s3_bucket_public_access_block" "frontend_assets" {
  bucket = aws_s3_bucket.frontend_assets.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Training data bucket
resource "aws_s3_bucket" "training_data" {
  bucket = var.training_data_bucket_name

  tags = {
    Name = "${var.project_name}-training-data"
  }
}
resource "aws_s3_bucket_public_access_block" "training_data" {
  bucket = aws_s3_bucket.training_data.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Model storage bucket
resource "aws_s3_bucket" "model_storage" {
  bucket = var.model_storage_bucket_name

  tags = {
    Name = "${var.project_name}-model-storage"
  }
}
resource "aws_s3_bucket_public_access_block" "model_storage" {
  bucket = aws_s3_bucket.model_storage.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}