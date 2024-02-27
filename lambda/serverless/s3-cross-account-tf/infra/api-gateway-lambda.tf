resource "aws_apigatewayv2_integration" "agw_parent" {
  api_id = aws_apigatewayv2_api.main.id

  integration_uri    = aws_lambda_function.s3upload.invoke_arn
  integration_type   = "AWS_PROXY"
  integration_method = "POST"
}

resource "aws_apigatewayv2_route" "s3_sync" {
  api_id = aws_apigatewayv2_api.main.id

  route_key = "POST /sync"
  target    = "integrations/${aws_apigatewayv2_integration.agw_parent.id}"
}

resource "aws_lambda_permission" "api_gw" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.s3upload.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_apigatewayv2_api.main.execution_arn}/*/*"
}

output "lambda_invoke_url" {
  value = aws_apigatewayv2_stage.dev.invoke_url
}
