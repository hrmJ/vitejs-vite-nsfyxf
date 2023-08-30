////
//@ts-ignore
const hasData = ([_, additions]) => Boolean(additions);

//@ts-ignore
const repoStatAsDatapoint = (showDeletions) => (item) => {
  const [seconds, additions, deletions] = item;
  const date = new Date(seconds * 1000);
  return {
    x: date,
    y: showDeletions ? deletions : additions,
    r: "",
  };
};

//@ts-ignore
export const createChartData = (data, showDeletions = false) => {
  if (!data) return [];
  return data.filter(hasData).map(repoStatAsDatapoint(showDeletions));
};

//@ts-ignore
export const createChart = (data) => {
  return {
    type: "line",
    data: {
      datasets: [
        { label: "additions", data: createChartData(data) },
        {
          label: "deletions",
          data: createChartData(data, true),
        },
      ],
    },
    options: {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "month",
          },
        },
      },
    },
  };
};
