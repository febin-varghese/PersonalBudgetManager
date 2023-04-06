function renderChart(months, amount) {
  const ctx = document.getElementById('annual-chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Amount',
          data: amount,
          borderColor: ['#ff6384'],
          borderWidth: 1
        }
      ]
    }
  });
}

async function fetchData() {
  const response = await fetch('http://localhost:5000/api/v1/income/2023');
  const { months, amount } = await response.json();
  // Use the data to create the chart using Chart.js
  renderChart(months, amount);
}
fetchData();
