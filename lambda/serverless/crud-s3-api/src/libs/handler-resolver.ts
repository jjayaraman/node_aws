export const handlerPath = (context: string) => {
  var path =  `${context.split(process.cwd())[1].substring(1).replace(/\\/g, '/')}`
  console.log('path : ' + path);
  return path
};
