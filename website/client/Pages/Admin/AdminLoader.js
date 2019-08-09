import React, { useState } from 'react';
import IsUser from '/client/components/IsUser';

const AdminLoader = () => {
  const [AdminRoutes, setAdminRoutes] = useState(null);
  const [routesLoading, setRoutesLoading] = useState(false);

  const getRouter = () => {
    if (routesLoading) {
      return AdminRoutes;
    }
    import('./AdminRoutes').then(({ default: Component }) => setAdminRoutes(Component));
    setRoutesLoading(true);
  }

  return (
    <IsUser role="admin">
      {getRouter}
    </IsUser>
  );
};

export default AdminLoader;
