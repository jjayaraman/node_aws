resource "aws_iam_role" "lambda_iam_role" {
  name = "lambda_iam_role"
  assume_role_policy = jsonencode(
    {
      "Version" : "2012-10-17",
      "Statement" : [
        {
          "Effect" : "Allow",
          "Principal" : {
            "Service" : "lambda.amazonaws.com"
          },
          "Action" : "sts:AssumeRole"
        }
      ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role       = aws_iam_role.lambda_iam_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

resource "aws_iam_policy" "s3_access_policy" {
  name = "s3_access_policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "s3:*",
        ]
        Effect   = "Allow"
        Resource = "*"
      },
    ]
  })
  # policy = jsonencode(
  #   {
  #     "Version" : "2012-10-17",
  #     "Statement" : [
  #       {
  #         "Effect" : "Allow",
  #         "Action" : "s3:*"
  #         "Resource" : "arn:aws:s3:::${data.aws_s3_bucket.s3_source_bucket.id}/^"
  #       },
  #       {
  #         "Effect" : "Allow",
  #         "Action" : "s3:*"
  #         "Resource" : "arn:aws:s3:::${data.aws_s3_bucket.s3_destination_bucket.id}/*"
  #       }
  #     ]
  # })
}

resource "aws_iam_role_policy_attachment" "lambda_s3_access" {
  role       = aws_iam_role.lambda_iam_role.name
  policy_arn = aws_iam_policy.s3_access_policy.arn
}

resource "aws_lambda_function" "s3upload" {
  function_name = "s3upload"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.s3upload_object.key

  runtime = "nodejs16.x"
  handler = "src/s3upload.handler"

  source_code_hash = filebase64sha256(var.zip_location)

  role = aws_iam_role.lambda_iam_role.arn
}

resource "aws_cloudwatch_log_group" "lambda_cwlg" {
  name = "/aws/lambda/${aws_lambda_function.s3upload.function_name}"

  retention_in_days = 3
}


// Upload the Lambda zip source to the S3 for Lambda deployment
resource "aws_s3_object" "s3upload_object" {
  bucket = aws_s3_bucket.lambda_bucket.id

  key    = "s3-cross-account.zip"
  source = var.zip_location

  etag = filemd5(var.zip_location)
}
