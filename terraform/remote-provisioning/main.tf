terraform {
  backend "s3" {
    bucket         = "noteflix-remote-backend"
    key            = "terraform.tfstate"
    region         = "ap-south-1"
    dynamodb_table = "noteflix-remote-backend-lock"
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
    from_port   = 3000
    to_port     = 3000
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

  user_data = <<EOF
#!/bin/bash
echo "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC2R9aW1ebCa6nrBEjvZ6NK5Nff0i7czO4mmHmqOCJS8V04Iy2U1xPRO3rHebS5FBAyw+X0wpg7GcCoIQ3loK1AKOq7Jhy+al3v8K6LRPz1eZLilUp16iIOaJ0uDz0Loik834iYxBNTSWK1+gJ0Lq090uwSx1LoWO0vnwoJMbwP/CERXi1AQAeFUNPs5dcEXP2PYyx8yAzxm7WoPw58XHC6t/AExSUPztx093F/r/ohTdMNpzYs12oltJOwFm+8U4PIMA1yumFSqR4xNCsK2VRzOrG65pcd1wXGGKQwO685FlVN16b4wuXz5YlDZK4O/N4Kp/TKjq2jLv9CHcXYDSdpIhojybfsL067l75SPbLqkcRBtPAu0BYEwVlSwz0deE2MExQOIjgcDQRMCiDR5cc485OHbsKyqw/abpfnsGSyOGg6Ckvi8LbDMcf0CHdQDZ7jdv/m/mInZhNpYf1UJK/WX83bPJst+uTdpPskf+WM8UGmlYDsaQkCMDHbLHANMgE= miku@himan" >> ~/.ssh/authorized_keys
chmod 0600 ~/.ssh/authorized_keys
EOF
}

output "ec2_public_dns" {
  value = aws_instance.ec2_aws_instance.public_dns
}

output "ec2_public_ip" {
  value = aws_instance.ec2_aws_instance.public_ip
}
