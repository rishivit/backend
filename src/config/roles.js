const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getUsers', 'manageUsers', 'getPredictions', 'managePredictions']);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'getPredictions', 'managePredictions']);

module.exports = {
  roles,
  roleRights,
};
