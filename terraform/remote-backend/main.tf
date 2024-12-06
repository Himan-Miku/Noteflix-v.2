terraform {
  backend "s3" {
    bucket         = "noteflix-remote-backend-v2"
    key            = "terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "noteflix-remote-backend-lock-v2"
    encrypt        = true
  }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.46.0"
    }
  }

  required_version = ">= 1.0.0"
}

provider "aws" {
  region = "ap-south-1"
}

resource "aws_s3_bucket" "noteflix_backend_bucket" {
  bucket        = "noteflix-remote-backend-v2"
  force_destroy = true
}

resource "aws_s3_bucket_versioning" "noteflix_bucket_versioning" {
  bucket = aws_s3_bucket.noteflix_backend_bucket.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "noteflix_backend_bucket_conf" {
  bucket = aws_s3_bucket.noteflix_backend_bucket.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_dynamodb_table" "noteflix_backend_lock" {
  name         = "noteflix-remote-backend-lock-v2"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "LockID"
  attribute {
    name = "LockID"
    type = "S"
  }
}
