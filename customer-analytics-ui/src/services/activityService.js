const ACTIVITY_KEY = "customer_activities";

export const getActivities = () => {
  const data = localStorage.getItem(ACTIVITY_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveActivity = (activity) => {
  const activities = getActivities();

  activities.unshift(activity);

  localStorage.setItem(
    ACTIVITY_KEY,
    JSON.stringify(activities)
  );
};