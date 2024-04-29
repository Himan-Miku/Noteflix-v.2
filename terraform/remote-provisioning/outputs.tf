output "ec2_public_ip" {
  value = aws_instance.ec2_aws_instance.public_ip
}
