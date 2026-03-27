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