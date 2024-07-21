const routes = (albumsHandler) => [
  // ADMIN Dashboard
  {
    method: "GET",
    path: "/driver/metrics",
    handler: (request, h) => albumsHandler.postAlbumHandler(request, h),
  },
  {
    method: "GET",
    path: "/driver/recentDelivery",
    handler: (request, h) =>
      albumsHandler.getDashboardMetricsHandler(request, h),
  },
  {
    method: "GET",
    path: "/driver/route",
    handler: (request, h) =>
      albumsHandler.getRecentDeliveryListHandler(request, h),
  },
  {
    method: "POST",
    path: "/driver/report",
    handler: (request, h) => albumsHandler.getDeliveryRouteHandler(request, h),
  },
  {
    method: "GET",
    path: "/driver/personalInformation",
    handler: (request, h) => albumsHandler.getDriverInfoHandler(request, h),
  },
];

module.exports = routes;
