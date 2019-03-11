import { PageModule } from '@/modules-arch/page-module'
import { MovementsHistoryModule } from '@/vue/modules/movements-history/module'

export class DashboardPageModule extends PageModule {
  constructor (pageOpts = {}, moduleOpts = {}) {
    super(pageOpts, {
      ...moduleOpts,
      importComponent: _ => import('@/vue/pages/Dashboard'),
      allowedSubmodules: [
        MovementsHistoryModule,
      ],
    })
  }
}
