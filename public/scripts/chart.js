const chart3 = new Chart(document.getElementById('myChart3'), {
    type: 'radar',
    data: {
        labels: ['Rating', 'ADR', 'KPR', 'DPR', 'KAST'],
        datasets: [{
            label: 'Distribution',
            data: [1, 1, 1, 1, 1],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            hoverBackgroundColor: '##FFFFFF',
            hoverBorderColor: '#FFFFFF',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#FFF',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }]
    },
    options: {
        plugins: {
            legend: {
                labels: {
                    color: '#FFFFFF'
                }
            },
            responsive: true
        },
        elements: {
            line: {
                borderWidth: 3
            }
        },
        scales: {
            r: {
                ticks: {
                    color: '#FFFFFF',
                    backdropColor: '#00000000'
                },
                grid: {
                    color: '#FFFFFF'
                },
                angleLines: {
                    color: '#FFFFFF'
                },
                pointLabels: {
                    color: '#FFFFFF'
                }
            }
        }
    }
});

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

  const chart2 = new Chart(document.getElementById('myChart2'), {
    type: 'doughnut',
    data: {
      labels: ['Kill', 'Death'],
      datasets: [{
        data: [319, 241],
        backgroundColor: ['#003f5c', '#d45087']
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