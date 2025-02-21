export const validateName = (_, value) => {
  const nameRegex = /^[a-zA-Z\s-']+$/;
  if (!nameRegex.test(value)) {
    return Promise.reject('Only letters, spaces, hyphens, and apostrophes allowed');
  }
  return Promise.resolve();
};

export const validateCIDR = (_, value) => {
  const cidrRegex = /^10\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.0\/21$/;
  if (!cidrRegex.test(value)) {
    return Promise.reject('Invalid CIDR format (10.x.x.0/21)');
  }
  return Promise.resolve();
};
