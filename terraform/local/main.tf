terraform {
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

data "aws_vpc" "default_vpc" {
  default = true
}

resource "aws_security_group" "instance_sg" {
  name        = "noteflix-instance-sg"
  description = "Security group for Noteflix EC2 instance"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "ec2_aws_instance" {
  ami             = "ami-001843b876406202a"
  instance_type   = "t2.micro"
  security_groups = [aws_security_group.instance_sg.name]
  tags = {
    Name = "terraform-ec2-instance"
  }
}
