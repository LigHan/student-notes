export default {
  id: "user-1",
  username: "student123",
  email: "student@example.com",
  fullName: "Алексей Студентов",
  avatar: "https://ui-avatars.com/api/?name=AS&background=2563eb&color=f9fafb",
  joinedAt: "2023-09-01T12:00:00Z",
  bio: "Собираю удобные шпаргалки по точным наукам и истории. Готов к обмену материалами перед сессией.",
  interests: ["Физика", "История", "Информатика"],
  preferredTags: ["Физика", "История", "Математика"],
  stats: {
    uploads: 8,
    requestsCompleted: 5,
    followers: 27,
  },
  notifications: [
    {
      id: "notif-1",
      text: "Новый комментарий к «Физика: законы Ньютона».",
      createdAt: "2024-02-22T14:25:00Z",
      read: false,
    },
    {
      id: "notif-2",
      text: "Запрос «Биология: клеточное дыхание» отмечен как выполненный.",
      createdAt: "2024-02-21T10:05:00Z",
      read: true,
    },
  ],
};
