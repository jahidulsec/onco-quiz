export const validationError = (issues: any[]) => {
  const obj: any = {};
  // [issue.path.join(".")]: issue.message,
  issues.map((issue) => {
    obj[issue.path.join(".")] = issue.message;
  });
  return obj;
};
