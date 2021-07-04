const BaseURL = "http://10.0.2.2:8080";
const apiLib = {
   login: BaseURL + "/login",
   register: BaseURL + "/accounts/register",
   updateProfile: BaseURL + "/accounts/profile",
   getProfile: BaseURL + "/accounts/profile",
   changePassword: BaseURL + "/accounts/changepassword",
   getCategories: BaseURL + "/categories",
   createCategories: BaseURL + "/categories/create",
   createTransaction: BaseURL + "/transactions",
   getDailyTransactioninCurrentYear: BaseURL + "/transactions/daily",
   getTransactionByParticularDate: BaseURL + "/transactions/date",
   getMonthlyTransactioninCurrentYear: BaseURL + "/transactions/month",
   getMothlyTransactionByParticularYear: BaseURL + "/transactions/month",
   updateTransaction: BaseURL + "/transactions/",
   getTransactionbyID: BaseURL + "/transactions/",
   createBudget: BaseURL + "/budgets",
};
export default apiLib;