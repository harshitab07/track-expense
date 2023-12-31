export const mapExpense = (expenses = []) => {

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 to get 1-based month and padStart for formatting

// Calculate total monthly and yearly expenses based on current date
const totalMonthlyExpense = expenses
  ?.filter(expense => expense?.date?.startsWith(`${currentYear}-${currentMonth}`))
  ?.reduce((total, expense) => total + expense.amount, 0);

const totalYearlyExpense = expenses
  ?.filter(expense => expense?.date?.startsWith(`${currentYear}`))
  ?.reduce((total, expense) => total + expense.amount, 0);

  const expensesCurrentMonth = expenses.filter(expense => expense.date.startsWith(`${currentYear}-${currentMonth}`));
const expensesCurrentYear = expenses.filter(expense => expense.date.startsWith(`${currentYear}`));
  const categoryWiseExpensesCurrentMonth = {};
  expensesCurrentMonth.forEach(expense => {
    const { category, amount } = expense;
    if (!categoryWiseExpensesCurrentMonth[category]) {
      categoryWiseExpensesCurrentMonth[category] = amount;
    } else {
      categoryWiseExpensesCurrentMonth[category] += amount;
    }
  });
  
  // Calculate category-wise expenses for current year
  const categoryWiseExpensesCurrentYear = {};
  expensesCurrentYear.forEach(expense => {
    const { category, amount } = expense;
    if (!categoryWiseExpensesCurrentYear[category]) {
      categoryWiseExpensesCurrentYear[category] = amount;
    } else {
      categoryWiseExpensesCurrentYear[category] += amount;
    }
  });

return (
    {
        year: {
            total: totalYearlyExpense,
            categoryWise: categoryWiseExpensesCurrentYear
        },
        month: {
            total: totalMonthlyExpense,
            categoryWise: categoryWiseExpensesCurrentMonth
        },
    }
)
};