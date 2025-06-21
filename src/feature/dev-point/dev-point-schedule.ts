import { addDays } from "date-fns";

const SPRINT_DAYS = 14;

type DevPointSprint = {
  date: Date;
  devPoint: number;
  sprint: number;
  isPublished?: boolean;
};

export function generateDevPointSchedule(
  projectStartDate: Date,
  projectEndDate: Date,
  currentDate: Date,
): DevPointSprint[] {
  const schedule = getSprints(
    addDays(projectStartDate, SPRINT_DAYS),
    projectEndDate,
  );

  return schedule.map((date, idx) => {
    const sprint = idx + 1;

    return {
      date: date,
      devPoint: Math.floor(10000 / (1 + (sprint - 1) / 26)),
      sprint: sprint,
      isPublished: date < currentDate,
    };
  });
}

function getSprints(startDate: Date, endDate: Date): Date[] {
  const schedule: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    schedule.push(new Date(currentDate));
    currentDate = addDays(currentDate, SPRINT_DAYS);
  }

  return schedule;
}
