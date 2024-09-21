const routes = (adminHandler) => [
  // ADMIN Dashboard
  {
    method: "POST",
    path: "/admin/generate/db",
    handler: (request, h) => adminHandler.postGenerateDBHandler(request, h),
  },
  {
    method: "POST",
    path: "/admin/generate/orders",
    handler: (request, h) => adminHandler.postGenerateOrdersHandler(request, h),
  },
  {
    method: "POST",
    path: "/admin/generate/vehicles",
    handler: (request, h) =>
      adminHandler.postGenerateVehiclesHandler(request, h),
  },
  {
    method: "POST",
    path: "/admin/generate/delivers",
    handler: (request, h) =>
      adminHandler.postGenerateDeliversHandler(request, h),
  },
  {
    method: "GET",
    path: "/admin/metrics",
    handler: (request, h) =>
      adminHandler.getDashboardMetricsHandler(request, h),
  },
  {
    method: "GET",
    path: "/admin/deliveryList",
    handler: (request, h) => adminHandler.getDeliveryListHandler(request, h),
  },
  {
    method: "GET",
    path: "/admin/employee/list",
    handler: (request, h) => adminHandler.getEmployeeListHandler(request, h),
  },
  {
    method: "POST",
    path: "/admin/employee/add",
    handler: (request, h) => adminHandler.postEmployeeHandler(request, h),
  },
  {
    method: "GET",
    path: "/admin/vehicle/list",
    handler: (request, h) => adminHandler.getVehicleListHandler(request, h),
  },
  {
    method: "GET",
    path: "/admin/delivery/{DeliveryID}",
    handler: (request, h) => adminHandler.getDeliveryDetailHandler(request, h),
  },
  {
    method: "GET",
    path: "/admin/order/{OrderID}",
    handler: (request, h) => adminHandler.getOrderListHandler(request, h),
  },
];

module.exports = routes;
