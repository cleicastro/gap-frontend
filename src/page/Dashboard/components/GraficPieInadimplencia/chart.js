import palette from '../../../../theme/palette';

const data = {
  datasets: [
    {
      data: [63, 15, 22],
      backgroundColor: [
        palette.primary.main,
        palette.error.main,
        palette.warning.main
      ],
      borderWidth: 8,
      borderColor: palette.white,
      hoverBorderColor: palette.white
    }
  ],
  labels: ['Desktop', 'Tablet', 'Mobile']
};

const options = {
  legend: {
    display: false
  },
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  cutoutPercentage: 80,
  layout: { padding: 0 },
  tooltips: {
    enabled: true,
    mode: 'index',
    intersect: false,
    borderWidth: 1,
    borderColor: palette.divider,
    backgroundColor: palette.white,
    titleFontColor: palette.text.primary,
    bodyFontColor: palette.text.secondary,
    footerFontColor: palette.text.secondary
  }
};

const devices = [
  {
    title: 'IRRF',
    value: '63'
  },
  {
    title: 'ISSQN-PF',
    value: '15'
  },
  {
    title: 'ALVARÁ',
    value: '23'
  }
];

export { data, options, devices };
