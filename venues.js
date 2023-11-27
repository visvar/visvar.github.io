/**
 * Information on publication venues, will be shown when clicking on a venue name in a publication.
 * short: abbreviation, has to match the value as used in Papers.xlsx
 * name: full official name, but without IEEE, ACM, etc.
 * publisher: the venue's publisher: IEEE, ACM, Springer, ...
 * type: conference, journal, workshop
 * url: main URL
 * resources: other URLs
 * topics: venue topics such as HCI, visualization, ...
 */
const venues = [
  // HCI
  {
    short: 'CHI',
    name: 'Conference on Human Factors in Computing Systems',
    publisher: 'ACM',
    type: 'conference',
    url: 'https://dl.acm.org/conference/chi',
    resources: [
      {
        label: 'proceedings',
        url: 'https://dl.acm.org/conference/chi/proceedings'
      },
      {
        label: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/Conference_on_Human_Factors_in_Computing_Systems'
      }
    ],
    topics: [
      'HCI',
      'VR/AR/MR',
      'visualization',
      'acessibility'
    ]
  },
  {
    short: 'CHI PLAY',
    name: 'Annual Symposium on Computer-Human Interaction in Play',
    publisher: 'ACM',
    type: 'conference',
    url: 'https://chiplay.acm.org/',
    resources: [
      {
        label: 'proceedings',
        url: 'https://dl.acm.org/conference/chi-play'
      }
    ],
    topics: [
      'HCI'
    ]
  },
  // {
  //     short: 'alt.CHI',
  //     name: 'alt.CHI',
  //     publisher: '',
  //     url: '',
  //     resources: []
  // },
  {
    short: 'CHI IMI Workshop',
    name: 'CHI IMI Workshop',
    publisher: '',
    type: 'workshop',
    url: 'https://teamdarmstadt.de/imi/',
    resources: [
      {
        label: 'Extended abstract',
        url: 'https://doi.org/10.1145/3491101.3503743'
      }
    ],
    topics: [
      'HCI',
      'music'
    ]
  },
  {
    short: 'TOCHI',
    name: 'Transactions on Computer-Human Interaction',
    publisher: 'ACM',
    type: 'journal',
    url: 'https://dl.acm.org/journal/tochi',
    resources: [],
    topics: [
      'HCI'
    ]
  },
  {
    short: 'MuC',
    name: 'Mensch und Computer',
    publisher: 'ACM',
    type: 'conference',
    url: 'https://fb-mci.gi.de/aktivitaeten/tagungsreihe-mensch-und-computer',
    resources: [
      {
        label: 'proceedings',
        url: 'https://dl.gi.de/communities/e76cbded-ce13-459a-9848-b52cb3e54706'
      }
    ],
    topics: [
      'HCI'
    ]
  },
  {
    short: 'DIS',
    name: 'Conference on Designing Interactive Systems',
    publisher: 'ACM',
    type: 'conference',
    url: 'https://dis.acm.org/',
    resources: [],
    topics: [
      'HCI'
    ]
  },
  {
    short: 'ISS',
    name: 'Interactive Surfaces and Spaces',
    publisher: 'ACM',
    type: 'conference',
    url: 'https://iss.acm.org/',
    resources: [],
    topics: [
      'HCI'
    ]
  },
  {
    short: 'UIST',
    name: 'Symposium on User Interface Software and Technology',
    publisher: 'ACM',
    type: 'conference',
    url: 'https://uist.acm.org/2023/',
    resources: [
      {
        label: 'Wikipedia',
        url: 'https://en.wikipedia.org/wiki/ACM_Symposium_on_User_Interface_Software_and_Technology'
      }
    ],
    topics: [
      'HCI'
    ]
  },
  {
    short: 'IUI',
    name: 'Annual Conference on Intelligent User Interfaces',
    publisher: 'ACM',
    type: 'conference',
    url: 'https://iui.acm.org/2023/',
    resources: [],
    topics: [
      'HCI'
    ]
  },
  {
    short: 'SUI',
    name: 'Symposium on Spatial User Interaction',
    publisher: 'ACM',
    type: 'conference',
    url: 'https://dl.acm.org/conference/sui',
    resources: [],
    topics: [
      'HCI'
    ]
  },


  // Visualization
  {
    short: 'TVCG',
    name: 'IEEE Transactions on Visualization and Computer Graphics',
    publisher: 'IEEE',
    type: 'journal',
    url: 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?reload=true&punumber=2945',
    resources: [],
    topics: [
      'visualization',
      'graphics'
    ]
  },
  {
    short: 'VIS',
    name: 'IEEE Visualization Conference',
    publisher: 'IEEE',
    type: 'conference',
    url: 'https://ieeevis.org/',
    resources: [],
    topics: [
      'visualization'
    ]
  },
  {
    short: 'alt.VIS',
    name: 'alt.VIS',
    publisher: '',
    type: 'workshop',
    url: 'https://altvis.github.io/',
    resources: [],
    topics: [
      'visualization'
    ]
  },
  {
    short: 'VINCI',
    name: 'International Symposium on Visual Information Communication and Interaction',
    publisher: 'ACM',
    type: 'conference',
    url: 'https://dl.acm.org/conference/vinci',
    resources: [],
    topics: [
      'visualization'
    ]
  },
  {
    short: 'EuroVis',
    name: 'EuroGraphics Conference on Visualization',
    publisher: 'EuroGraphics',
    type: 'conference',
    url: 'https://www.eurovis.org/',
    resources: [],
    topics: [
      'visualization'
    ]
  },
  {
    short: 'PacificVis',
    name: 'Pacific Visualization Symposium',
    publisher: 'IEEE',
    type: 'conference',
    url: 'https://pacificvis.github.io',
    resources: [],
    topics: [
      'visualization'
    ]
  },
  {
    short: 'AVI',
    name: 'Advanced Visual Interfaces',
    publisher: 'ACM',
    type: 'conference',
    url: 'https://dl.acm.org/conference/avi',
    resources: [],
    topics: [
      'visualization'
    ]
  },
  {
    short: 'EuroVA',
    name: 'International EuroVis Workshop on Visual Analytics',
    publisher: 'EuroGraphics',
    type: 'workshop',
    url: 'https://www.eurova.org/',
    resources: [],
    topics: [
      'visualization'
    ]
  },
  {
    short: 'CGF',
    name: 'Computer Graphics Forum',
    publisher: 'Wiley',
    type: 'journal',
    url: 'https://onlinelibrary.wiley.com/journal/14678659',
    resources: [],
    topics: [
      'visualization'
    ]
  },
  {
    short: 'CG&A',
    name: 'Computer Graphics and Applications',
    publisher: 'IEEE',
    type: 'journal',
    url: 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=38',
    resources: [],
    topics: [
      'visualization'
    ]
  },
  {
    short: 'VMV',
    name: 'International Symposium on Vision, Modeling, and Visualization',
    publisher: 'Gesellschaft für Informatik',
    type: 'conference',
    url: '',
    resources: [],
    topics: [
      'visualization',
      'graphics'
    ]
  },


  // VR/AR
  {
    short: 'VR',
    name: 'IEEE Virtual Reality Conference',
    publisher: 'IEEE',
    type: 'conference',
    url: 'https://ieeevr.org/',
    resources: [],
    topics: [
      'VR/AR/MR'
    ]
  },
  {
    short: 'ISMAR',
    name: 'International Symposium on Mixed and Augmented Reality',
    publisher: 'IEEE',
    type: 'conference',
    url: 'https://www.ismar.net/',
    resources: [],
    topics: [
      'VR/AR/MR'
    ]
  },
  {
    short: 'VRST',
    name: 'Symposium on Virtual Reality Software and Technology',
    publisher: 'ACM',
    type: 'conference',
    url: 'https://vrst.acm.org/',
    resources: [],
    topics: [
      'VR/AR/MR'
    ]
  },
  {
    short: 'VRW',
    name: 'Virtual Reality and 3D User Interfaces Abstracts and Workshops',
    publisher: 'IEEE',
    type: 'conference',
    url: 'https://ieeexplore.ieee.org/xpl/conhome/1836626/all-proceedings',
    resources: [],
    topics: [
      'VR/AR/MR'
    ]
  },


  // Music and Audio
  {
    short: 'ISMIR',
    name: 'International Society for Music Information Retrieval',
    publisher: 'ISMIR',
    type: 'conference',
    url: 'https://ismir.net',
    resources: [
      {
        label: 'proceedings',
        url: 'https://ismir.net/conferences/'
      },
      {
        label: 'GitHub',
        url: 'https://github.com/ismir'
      },
    ],
    topics: [
      'music',
      'ML'
    ]
  },
  {
    short: 'TISMIR',
    name: 'Transactions of the International Society for Music Information Retrieval',
    publisher: 'Ubiquity Press',
    type: 'journal',
    url: 'https://transactions.ismir.net/',
    resources: [
      {
        label: 'publisher website',
        url: 'https://www.ubiquitypress.com/'
      }
    ],
    topics: [
      'music',
      'ML'
    ]
  },
  {
    short: 'Audio Mostly',
    name: 'Audio Mostly',
    publisher: 'ACM',
    type: 'conference',
    url: 'https://audiomostly.com/',
    resources: [],
    topics: [
      'audio',
      'music'
    ]
  },


  // Other
  {
    short: 'arXiv',
    name: 'arXiv',
    publisher: 'Cornell Tech',
    type: 'pre-print server',
    url: 'https://info.arxiv.org',
    resources: [],
    topics: [
      'all of computer science, physics, and more'
    ]
  },
  {
    short: 'ETRA',
    name: 'Symposium on Eye Tracking Research & Applications',
    publisher: 'ACM',
    type: 'conference',
    url: 'https://etra.acm.org/',
    resources: [],
    topics: [
      'eye-tracking'
    ]
  },
  {
    short: 'ETVIS',
    name: 'Workshop on Eye Tracking and Visualization',
    publisher: '',
    type: 'workshop',
    url: 'https://www.etvis-workshop.org/',
    resources: [],
    topics: [
      'eye-tracking',
      'visualization'
    ]
  },
  {
    short: 'it - Information Technology',
    name: 'it - Information Technology',
    publisher: 'De Gruyter',
    type: 'journal',
    url: 'https://www.degruyter.com/journal/key/itit/html',
    resources: [],
    topics: [
      'computer science'
    ]
  },
  {
    short: 'Lecture Notes in Computer Science',
    name: 'Lecture Notes in Computer Science',
    publisher: 'Springer',
    type: 'conference',
    url: 'https://www.springer.com/gp/computer-science/lncs',
    resources: [],
    topics: [
      'computer science'
    ]
  },
  {
    short: 'ESANN',
    name: 'European Symposium on Artificial Neural Networks, Computational Intelligence and Machine Learning',
    publisher: '',
    type: 'conference',
    url: 'https://www.esann.org/',
    resources: [],
    topics: [
      'ML'
    ]
  },
  {
    short: 'AutomotiveUI',
    name: 'Automotive User Interfaces and Interactive Vehicular Applications',
    publisher: 'ACM',
    type: 'conference',
    url: 'https://dl.acm.org/conference/automotiveui',
    resources: [],
    topics: [
      'HCI'
    ]
  },
  {
    short: 'Transport in Porous Media',
    name: 'Transport in Porous Media',
    publisher: 'Springer',
    type: 'journal',
    url: 'https://www.springer.com/journal/11242',
    resources: [],
    topics: [
      'simulation'
    ]
  },
  {
    short: 'VALUETOOLS',
    name: 'International Conference on Performance Evaluation Methodologies and Tools',
    publisher: 'EAI',
    type: 'conference',
    url: 'https://valuetools.eai-conferences.org',
    resources: [],
    topics: [
      'performance evaluation',
      'optimization'
    ]
  },
]

export const venueMap = new Map(venues.map(d => [
  d.short,
  { ...d, pageUrl: d.short.replaceAll(' ', '_').toLowerCase() }
]))
