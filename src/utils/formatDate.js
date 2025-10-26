const dateFormatter = new Intl.DateTimeFormat("ru-RU", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

export function formatDateTime(value) {
  if (!value) {
    return "";
  }

  try {
    return dateFormatter.format(new Date(value));
  } catch (error) {
    console.error("Failed to format date", value, error);
    return value;
  }
}

export function formatDate(value) {
  if (!value) {
    return "";
  }

  try {
    return new Intl.DateTimeFormat("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  } catch (error) {
    console.error("Failed to format date", value, error);
    return value;
  }
}
