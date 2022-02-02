import { Router } from 'express'

import userRoutes from '../../../../module/users/infra/http/routes/user.routes'
import referenceRoutes from '../../../../module/references/infra/http/routes/reference.routes'
import categoriesRoutes from "../../../../module/categories/infra/http/routes/category.routes";
import budgetRoutes from "../../../../module/budget/infra/http/routes/budget.routes";
import expensesRoutes from "../../../../module/expenses/infra/http/routes/expenses.routes";

const routes = Router()

routes.use('/users', userRoutes)
routes.use('/references', referenceRoutes)
routes.use('/categories', categoriesRoutes)
routes.use('/budget', budgetRoutes)
routes.use('/expenses', expensesRoutes)

export default routes