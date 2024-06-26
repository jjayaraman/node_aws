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
  name = "s3_access_policy_2"
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
}

resource "aws_iam_role_policy_attachment" "lambda_s3_access" {
  role       = aws_iam_role.lambda_iam_role.name
  policy_arn = aws_iam_policy.s3_access_policy.arn
}


resource "aws_iam_policy" "lambda_assume_role" {
  name = "lambda_assume_role"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = [
          "sts:AssumeRole",
        ]
        Effect = "Allow"
        Resource = "arn:aws:iam::11111:role/jay-cross-account-assume-role"
      },
    ]
  })
}
resource "aws_iam_role_policy_attachment" "lambda_assume_role_pa" {
  role       = aws_iam_role.lambda_iam_role.name
  policy_arn = aws_iam_policy.lambda_assume_role.arn
}

resource "aws_lambda_function" "s3upload" {
  function_name = "s3upload"

  s3_bucket = aws_s3_bucket.lambda_bucket.id
  s3_key    = aws_s3_object.s3upload_object.key

  runtime = "nodejs16.x"
  handler = "src/s3upload.handler"

  source_code_hash = filebase64sha256(var.zip_location)

  role = aws_iam_role.lambda_iam_role.arn

  environment {
    variables = {
      sourceBucket = ""
      destBucket   = ""
      roleArn = ""
    }
  }
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
