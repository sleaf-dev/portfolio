<script setup lang="ts">
import axios from 'axios';

interface ContributionData {
  [date: string]: number;
}

interface Day {
  date: string;
  contributions: number;
}

const contributions = ref<ContributionData>({});
const weeks = ref<Day[][]>([]);

const currentDate = new Date();

const fetchContributions = async () => {
  await axios
    .get('/api/gitlab/calendar')
    .then((response) => {
      contributions.value = response.data.calendar || {};
    })
    .catch((error) => {
      console.log(error);
      contributions.value = {};
    });
};

const generateCalendar = () => {
  const daysArray: Day[] = [];

  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - 250);
  const startDay = startDate.getDay() % 7;
  startDate.setDate(startDate.getDate() - startDay);

  const endDate = new Date(currentDate);

  const currentDateIter = new Date(startDate);

  while (currentDateIter <= endDate) {
    const dateStr = currentDateIter.toISOString().split('T')[0];
    daysArray.push({
      date: dateStr || '',
      contributions: contributions.value[dateStr || ''] ?? 0,
    });
    currentDateIter.setDate(currentDateIter.getDate() + 1);
  }

  const groupedWeeks: Day[][] = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    const week = daysArray.slice(i, i + 7);
    groupedWeeks.push(week);
  }

  weeks.value = groupedWeeks;
};

const getContributionClass = (contributions: number): string => {
  if (contributions === 0) return 'level-0';
  if (contributions <= 1) return 'level-1';
  if (contributions <= 3) return 'level-2';
  if (contributions <= 5) return 'level-3';
  return 'level-4';
};

onMounted(async () => {
  await fetchContributions();
  generateCalendar();
});

onUnmounted(() => {});
</script>

<template>
  <div>
    <div class="contribution-calendar">
      <div
        class="calendar-grid"
        :style="{
          gridTemplateColumns: `repeat(${weeks.length}, minmax(10px, 1fr))`,
          gridTemplateRows: `repeat(7, minmax(10px, 1fr))`,
        }">
        <div v-for="(week, wi) in weeks" :key="wi">
          <div
            v-for="(day, di) in week"
            :key="`${wi}-${di}`"
            :class="day ? ['day', getContributionClass(day.contributions)] : 'empty'"
            :title="day ? `${day.date}: ${day.contributions} contributions` : ''" />
        </div>
      </div>
      <div class="legend">
        <div class="legend-square level-0"></div>
        <div class="legend-square level-1"></div>
        <div class="legend-square level-2"></div>
        <div class="legend-square level-3"></div>
        <div class="legend-square level-4"></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.contribution-calendar {
  width: 100%;
  height: fit-content;

  .calendar-grid {
    display: grid;
    width: 100%;
    height: fit-content;
    grid-gap: 3px;

    .day {
      border-radius: 0.2rem;
      width: 100%;
      height: 100%;
      margin-top: 3px;
      aspect-ratio: 20 /1;

      &.level-0 {
        background-color: #ffffff;
      }
      &.level-1 {
        background-color: #d485e6;
      }
      &.level-2 {
        background-color: #ab38c7;
      }
      &.level-3 {
        background-color: #781197;
      }
      &.level-4 {
        background-color: #630573;
      }
    }

    .empty {
      background-color: transparent;
    }
  }

  .legend {
    display: flex;
    align-items: center;
    margin-top: 1rem;

    .legend-square {
      width: 1.2rem;
      height: 1.2rem;
      margin: 0.2rem;
      border-radius: 0.2rem;

      &.level-0 {
        background-color: #ffffff;
      }
      &.level-1 {
        background-color: #d485e6;
      }
      &.level-2 {
        background-color: #ab38c7;
      }
      &.level-3 {
        background-color: #781197;
      }
      &.level-4 {
        background-color: #630573;
      }
    }
  }
}
</style>
