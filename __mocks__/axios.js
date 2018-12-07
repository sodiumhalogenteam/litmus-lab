module.exports = {
  get: jest.fn(site => {
    if (site !== "") Promise.resolve({ data: null });
    else Promise.reject("failed");
  })
};
