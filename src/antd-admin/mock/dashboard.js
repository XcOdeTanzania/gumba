import { Mock, Constant } from './_utils'

const { ApiPrefix, Color } = Constant

const Dashboard = Mock.mock({
  'sales|8': [
    {
      'name|+1': 2008,
      'Choo|200-500': 1,
      'Sanitation|180-400': 1,
      'Water|300-550': 1,
    },
  ],
  cpu: {
    'usage|50-600': 1,
    space: 825,
    'cpu|40-90': 1,
    'data|20': [
      {
        'cpu|20-80': 1,
      },
    ],
  },
  browser: [
    {
      name: 'Nyumba ni choo',
      percent: 43.3,
      status: 1,
    },
    {
      name: 'Auntie Rafiki',
      percent: 33.4,
      status: 2,
    },
    {
      name: 'Maji safi',
      percent: 34.6,
      status: 3,
    },
    {
      name: 'Malaria desinty',
      percent: 12.3,
      status: 4,
    },
    {
      name: 'Aki ya Elimu',
      percent: 3.3,
      status: 1,
    },
    {
      name: 'Chozi la binti',
      percent: 2.53,
      status: 1,
    },
  ],
  user: {
    name: 'github',
    sales: 3241,
    sold: 3556,
  },
  'completed|12': [
    {
      'name|+1': 2008,
      'Task complete|200-1000': 1,
      'Cards Complete|200-1000': 1,
    },
  ],
  'comments|5': [
    {
      name: '@last',
      'status|1-3': 1,
      content: '@sentence',
      avatar() {
        return Mock.Random.image(
          '48x48',
          Mock.Random.color(),
          '#757575',
          'png',
          this.name.substr(0, 1)
        )
      },
      date() {
        return `2016-${Mock.Random.date('MM-dd')} ${Mock.Random.time(
          'HH:mm:ss'
        )}`
      },
    },
  ],
  'recentSales|36': [
    {
      'id|+1': 1,
      name: '@last',
      'status|1-4': 1,
      date() {
        return `${Mock.Random.integer(2015, 2016)}-${Mock.Random.date(
          'MM-dd'
        )} ${Mock.Random.time('HH:mm:ss')}`
      },
      'price|10-200.1-2': 1,
    },
  ],
  quote: {
    name: 'Kalimwenjuma',
    title: 'Manager',
    content:
      "Meeting",
    avatar:
      '//cdn.antd-admin.zuiidea.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
  },
  numbers: [
    {
      icon: 'team',
      color: Color.green,
      title: 'Surveys',
      number: 2781,
    },
    {
      icon: 'team',
      color: Color.blue,
      title: 'Surveyors',
      number: 3241,
    },
    {
      icon: 'edit',
      color: Color.purple,
      title: 'Sites',
      number: 253,
    },
    {
      icon: 'code-o',
      color: Color.red,
      title: 'Pending',
      number: 4324,
    },
  ],
})

module.exports = {
  [`GET ${ApiPrefix}/dashboard`](req, res) {
    res.json(Dashboard)
  },
}
