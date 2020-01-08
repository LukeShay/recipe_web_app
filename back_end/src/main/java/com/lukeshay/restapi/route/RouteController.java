package com.lukeshay.restapi.route;

import com.lukeshay.restapi.utils.Bodys;
import com.lukeshay.restapi.utils.Responses;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/routes")
@PreAuthorize("isAuthenticated()")
@Api(value = "Route api endpoints.")
public class RouteController {

  private static Logger LOG = LoggerFactory.getLogger(RouteController.class.getName());

  private RouteService routeService;

  @Autowired
  public RouteController(RouteService routeService) {
    this.routeService = routeService;
  }

  @PostMapping("")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Create a route.", response = Route.class)
  public ResponseEntity<?> createRoute(HttpServletRequest request, @RequestBody Route body) {
    LOG.debug("Creating new route {}", body.toString());

    Route route = routeService.createRoute(request, body);

    if (route == null) {
      return Responses.badRequestJsonResponse(Bodys.error("Error creating route."));
    } else {
      return Responses.okJsonResponse(route);
    }
  }

  @GetMapping("/{wallId}")
  @PreAuthorize("permitAll()")
  @ApiOperation(value = "Get routes by wall id.", response = Route.class)
  public ResponseEntity<?> getRoute(HttpServletRequest request, @PathVariable String wallId) {
    LOG.debug("Getting routes from wall {}", wallId);

    List<Route> routes = routeService.getRoutesByWall(wallId);

    return Responses.okJsonResponse(routes);
  }

  @PutMapping("")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Update a route.", response = Route.class)
  public ResponseEntity<?> updateRoute(HttpServletRequest request, @RequestBody Route body) {
    LOG.debug("Updating route {}", body.getId());

    Route route =
        routeService.updateRoute(
            request,
            body.getId(),
            body.getGymId(),
            body.getWallId(),
            body.getTypes(),
            body.getHoldColor(),
            body.getSetter(),
            body.getName());

    if (route == null) {
      return Responses.badRequestJsonResponse(Bodys.error("Error updating route."));
    } else {
      return Responses.okJsonResponse(route);
    }
  }

  @DeleteMapping("")
  @PreAuthorize("isAuthenticated()")
  @ApiOperation(value = "Delete a route", response = Route.class)
  public ResponseEntity<?> deleteRoute(HttpServletRequest request, @RequestBody Route body) {
    LOG.debug("Deleting route {}", body.getId());

    Route route = routeService.deleteRoute(request, body);

    if (route == null) {
      return Responses.badRequestJsonResponse(Bodys.error("Error deleting route."));
    } else {
      return Responses.okJsonResponse(route);
    }
  }
}