import React from 'react';
import { Switch, Route } from 'react-router';

function renderRoutes(routes: any, extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route: any, i: number) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props: any) =>
            route.render ? (
              route.render({ ...props, ...extraProps, route })
            ) : (
                <route.component {...props} {...extraProps} route={route} />
              )
          }
        />
      ))}
    </Switch>
  ) : null;
}

export default renderRoutes;
