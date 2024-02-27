resource "null_resource" "zip_source" {
  provisioner "local-exec" {
    command = <<EOT
      cd ..
      npm install
      npm run predeploy
      cp -r ./node_modules ./dist/
      cd dist
      zip -r s3-cross-account.zip .
    EOT

    # Specify the working directory if needed
    # working_dir = "/path/to/project"
  }
}
