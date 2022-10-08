
export const hello = async (event: any) => {

  console.log(`event : ${event}`);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: `Example hello API secured with lambda custom authoriser`,
      },
      null,
      2
    ),
  };
};
