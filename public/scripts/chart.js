const chart1 = new Chart(document.getElementById('myChart1'), {
    type: 'pie',
    data: {
      labels: ['Win', 'Lose'],
      datasets: [{
        data: [41, 12],
        backgroundColor: ['#2f4b7c', '#f95d6a']
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom',
          title: {
            display: true,
          },
          labels: {
            color: '#FFFFFF'
          }
        },
        responsive: true
      }
    }
  });