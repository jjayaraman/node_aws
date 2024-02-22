data "aws_s3_bucket" "s3_source_bucket" {
  bucket = var.s3_source_bucket
}

data "aws_s3_bucket" "s3_destination_bucket" {
  bucket = var.s3_destination_bucket
}
