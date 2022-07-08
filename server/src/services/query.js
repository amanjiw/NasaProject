const getPagination = (query) => {
  const limit = Math.abs(query.limit) || 0; // zero  return all data in mongodb
  const page = Math.abs(query.page) || 1;

  const skip = (page - 1) * limit;

  return {
    skip,
    limit,
  };
};

module.exports = {
  getPagination,
};
