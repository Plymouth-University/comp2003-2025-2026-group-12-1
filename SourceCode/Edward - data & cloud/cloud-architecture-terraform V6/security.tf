#Security group for EC2
resource "aws_security_group" "ec2" {
  name        = "${var.project_name}-ec2-sg"
  description = "Security group for EC2 application server"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-ec2-sg"
  }
}

#Security group for EC2 to access HTTPS from in the VPC
resource "aws_vpc_security_group_ingress_rule" "ec2_https_from_vpc" {
  security_group_id = aws_security_group.ec2.id
  cidr_ipv4         = var.vpc_cidr
  from_port         = 443
  to_port           = 443
  ip_protocol       = "tcp"
  description       = "Allow HTTPS from within VPC"
}

#Security group for RDS
resource "aws_security_group" "rds" {
  name        = "${var.project_name}-rds-sg"
  description = "Security group for RDS"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-rds-sg"
  }
}

#Security group for RDS to allow MySQL from the EC2 in the security group
resource "aws_vpc_security_group_ingress_rule" "rds_from_ec2_mysql" {
  security_group_id            = aws_security_group.rds.id
  referenced_security_group_id = aws_security_group.ec2.id
  from_port                    = 3306
  to_port                      = 3306
  ip_protocol                  = "tcp"
  description                  = "Allow MySQL from EC2 SG"
}

#Security group for EC2 to allow MySQL from the RDS in the security group
resource "aws_vpc_security_group_egress_rule" "ec2_to_rds_mysql" {
  security_group_id            = aws_security_group.ec2.id
  referenced_security_group_id = aws_security_group.rds.id
  from_port                    = 3306
  to_port                      = 3306
  ip_protocol                  = "tcp"
  description                  = "Allow MySQL to RDS SG"
}

#Security group for Lambda
resource "aws_security_group" "lambda" {
  name        = "${var.project_name}-lambda-sg"
  description = "Security group for Lambda"
  vpc_id      = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-lambda-sg"
  }
}

#Security group for Lambda to connect to the EC2 using HTTPS
resource "aws_vpc_security_group_egress_rule" "lambda_to_ec2_https" {
  security_group_id            = aws_security_group.lambda.id
  referenced_security_group_id = aws_security_group.ec2.id
  from_port                    = 443
  to_port                      = 443
  ip_protocol                  = "tcp"
  description                  = "Allow Lambda to EC2 over HTTPS"
}

#Security group for Lambda to connect to the RDS using MySQL
resource "aws_vpc_security_group_egress_rule" "lambda_to_rds_mysql" {
  security_group_id            = aws_security_group.lambda.id
  referenced_security_group_id = aws_security_group.rds.id
  from_port                    = 3306
  to_port                      = 3306
  ip_protocol                  = "tcp"
  description                  = "Allow Lambda to RDS over MySQL"
}