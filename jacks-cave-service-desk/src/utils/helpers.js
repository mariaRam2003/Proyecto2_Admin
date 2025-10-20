import { categories } from "../data/categories";

export const getPriorityColor = (priority) => {
  const colors = {
    critical: "bg-red-100 text-red-800 border-red-300",
    high: "bg-orange-100 text-orange-800 border-orange-300",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-300",
    low: "bg-blue-100 text-blue-800 border-blue-300",
  };
  return colors[priority] || colors.low;
};

export const getCategoryColor = (categoryId) => {
  const category = categories.find((c) => c.id === categoryId);
  const colors = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
    blue: "bg-blue-500",
  };
  return colors[category?.color] || "bg-gray-500";
};

export const getStatistics = (tickets, categoriesList) => {
  const categoryStats = categoriesList.map((cat) => ({
    name: cat.name,
    count: tickets.filter((t) => t.category === cat.id).length,
    color: cat.color,
  }));

  const tagStats = {};
  tickets.forEach((ticket) => {
    ticket.tags.forEach((tag) => {
      tagStats[tag] = (tagStats[tag] || 0) + 1;
    });
  });

  const topTags = Object.entries(tagStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return { categoryStats, topTags };
};
