// utils/roleUtils.js

// Define roles
export const Roles = {
  ADMIN: "admin",
  ENGINEER: "engineer",
  MANAGER: "manager",
};

// Check if user has permission
export function hasRole(user, role) {
  if (!user || !user.role) return false;
  return user.role === role;
}

// Example usage:
// hasRole(currentUser, Roles.ADMIN) returns true if user is admin
