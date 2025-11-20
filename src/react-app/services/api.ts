// src/react-app/services/api.ts

export const fetchName = async (): Promise<{ name: string }> => {
  const response = await fetch("/api/");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export const fetchGreeting = async (
  name: string,
): Promise<{ message: string }> => {
  const response = await fetch(`/api/greet?name=${name}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};
