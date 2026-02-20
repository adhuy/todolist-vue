const ALL_DATA = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
}));

export function fetchUsers(page = 1, limit = 10) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * limit;
      const end = start + limit;

      resolve({
        data: ALL_DATA.slice(start, end),
        total: ALL_DATA.length,
      });
    }, 500); // simulasi API delay
  });
}
