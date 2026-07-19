import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./views/HomeView.vue') },
  { path: '/calculus', component: () => import('./views/CourseView.vue') },
  { path: '/calculus/limit', component: () => import('./views/concepts/LimitView.vue') },
  { path: '/calculus/derivative', component: () => import('./views/concepts/DerivativeView.vue') },
  { path: '/calculus/integral', component: () => import('./views/concepts/IntegralView.vue') },
  { path: '/calculus/ftc', component: () => import('./views/concepts/FTCView.vue') },
  { path: '/calculus/taylor', component: () => import('./views/concepts/TaylorView.vue') },
  { path: '/linear-algebra', component: () => import('./views/CourseView.vue') },
  { path: '/linear-algebra/elimination', component: () => import('./views/linear-algebra/EliminationView.vue') },
  { path: '/linear-algebra/determinant', component: () => import('./views/linear-algebra/DeterminantView.vue') },
  { path: '/linear-algebra/linear-map', component: () => import('./views/linear-algebra/LinearMapView.vue') },
  { path: '/linear-algebra/vector-space', component: () => import('./views/linear-algebra/VectorSpaceView.vue') },
  { path: '/linear-algebra/eigen', component: () => import('./views/linear-algebra/EigenView.vue') },
  { path: '/probability', component: () => import('./views/CourseView.vue') },
  { path: '/probability/points-problem', component: () => import('./views/probability/PointsProblemView.vue') },
  { path: '/probability/bayes', component: () => import('./views/probability/BayesView.vue') },
  { path: '/probability/distribution', component: () => import('./views/probability/DistributionView.vue') },
  { path: '/probability/lln', component: () => import('./views/probability/LLNView.vue') },
  { path: '/probability/clt', component: () => import('./views/probability/CLTView.vue') },
  { path: '/complex', component: () => import('./views/CourseView.vue') },
  { path: '/complex/imaginary', component: () => import('./views/complex/ImaginaryView.vue') },
  { path: '/complex/holomorphic', component: () => import('./views/complex/HolomorphicView.vue') },
  { path: '/complex/cauchy-integral', component: () => import('./views/complex/CauchyIntegralView.vue') },
  { path: '/complex/residue', component: () => import('./views/complex/ResidueView.vue') },
  { path: '/complex/continuation', component: () => import('./views/complex/ContinuationView.vue') },
  { path: '/mathphys', component: () => import('./views/CourseView.vue') },
  { path: '/mathphys/pde-intro', component: () => import('./views/mathphys/PdeIntroView.vue') },
  { path: '/mathphys/wave', component: () => import('./views/mathphys/WaveView.vue') },
  { path: '/mathphys/heat', component: () => import('./views/mathphys/HeatView.vue') },
  { path: '/mathphys/laplace', component: () => import('./views/mathphys/LaplaceView.vue') },
  { path: '/mathphys/separation', component: () => import('./views/mathphys/SeparationView.vue') },
  { path: '/numerical', component: () => import('./views/CourseView.vue') },
  { path: '/numerical/float-error', component: () => import('./views/numerical/FloatErrorView.vue') },
  { path: '/numerical/root-finding', component: () => import('./views/numerical/RootFindingView.vue') },
  { path: '/numerical/interpolation', component: () => import('./views/numerical/InterpolationView.vue') },
  { path: '/numerical/quadrature', component: () => import('./views/numerical/QuadratureView.vue') },
  { path: '/numerical/linear-system', component: () => import('./views/numerical/LinearSystemView.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

export default router
