const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "inicio", component: () => import("pages/inicio/pageInicio.vue") },
      { path: "actasofrenda", component: () => import("pages/actasOfrenda/pageActaOfrendaLista.vue") },
      { path: "acta", component: () => import("pages/actasOfrenda/pageActaOfrenda.vue") },
      { path: "movimiento", component: () => import("src/pages/movimiento/pageMovimiento.vue") },
      {
        path: "configuraciones",
        component: () => import("pages/pageConfiguraciones.vue"),
      },
      {
        path: "registros",
        component: () => import("pages/pageRegistros.vue"),
      },
      {
        path: "balances",
        component: () => import("pages/balances/pageBalances.vue"),
      },
      {
        path: "balancedetallado",
        component: () => import("pages/balances/pageBalanceDetallado.vue"),
      },
      {
        path: "graficos",
        component: () => import("pages/pageGraficos2.vue"),
      },
      {
        path: "test",
        component: () => import("pages/PageStoragePlay.vue"),
      },
      {
        path: "subirfb",
        component: () => import("pages/pageSubirMultimedia.vue"),
      },
      
      

      
      
    ],
  },

  {
    path: "/ingresar",
    component: () => import("layouts/AuthLayout.vue"),
    children: [{ path: "", component: () => import("pages/pageLogin.vue") }],
  },
  {
    path: "/perfil",
    component: () => import("layouts/AuthLayout.vue"),
    children: [{ path: "", component: () => import("pages/pagePerfil.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
