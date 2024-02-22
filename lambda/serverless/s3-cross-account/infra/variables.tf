variable "zip_location" {
  type        = string
  description = "Lambda source zip file location path"
}

variable "s3_source_bucket" {
  type        = string
  description = "S3 soruce bucket"
}

variable "s3_destination_bucket" {
  type        = string
  description = "S3 destination bucket"
}
