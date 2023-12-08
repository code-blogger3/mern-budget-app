class ApiResponse {
  constructor(statusCode, message = "Success", data = null) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
// {
//       _id: updatedUser._id,
//       username: updatedUser.username,
//       budgets: updatedUser.budgets,
//     }
