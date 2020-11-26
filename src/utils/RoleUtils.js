export const isAdmin = (user) => {
  return user?.roleid === 0;
};

export const isMaintenancer = (user) => {
  return user?.roleid === 1;
};
