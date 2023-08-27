/**
 * Information on publication venues, will be shown when clicking on a venue name in a publication.
 *
 * @todo compile venue pages
 * @todo add more information here
 */
const venues = [
    {
        short: 'ISMIR',
        name: 'International Society for Music Information Retrieval',
        publisher: 'ISMIR',
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
        ]
    },
    {
        short: 'TVCG',
        name: 'IEEE Transactions on Visualization and Computer Graphics',
        publisher: 'IEEE',
        url: 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?reload=true&punumber=2945',
        resources: []
    },
    {
        short: 'TISMIR',
        name: 'Transactions of the International Society for Music Information Retrieval',
        publisher: 'Ubiquity Press',
        url: 'https://transactions.ismir.net/',
        resources: [
            {
                label: 'publisher website',
                url: 'https://www.ubiquitypress.com/'
            }
        ]
    },
    {
        short: 'VIS',
        name: 'IEEE Visualization Conference',
        publisher: 'IEEE',
        url: 'https://ieeevis.org/',
        resources: []
    },
    {
        short: 'alt.VIS',
        name: 'alt.VIS',
        publisher: '',
        url: 'https://altvis.github.io/',
        resources: []
    },
    {
        short: 'IEEE VR',
        name: 'IEEE Virtual Reality Conference',
        publisher: 'IEEE',
        url: 'https://ieeevr.org/',
        resources: []
    },
    {
        short: 'CHI',
        name: 'Conference on Human Factors in Computing Systems',
        publisher: 'ACM',
        url: 'https://dl.acm.org/conference/chi',
        resources: []
    },
    // {
    //     short: 'alt.CHI',
    //     name: 'alt.CHI',
    //     publisher: '',
    //     url: '',
    //     resources: []
    // },
    {
        short: 'VINCI',
        name: 'International Symposium on Visual Information Communication and Interaction',
        publisher: 'ACM',
        url: 'https://dl.acm.org/conference/vinci',
        resources: []
    },
    {
        short: 'EuroVis',
        name: 'EuroGraphics Conference on Visualization',
        publisher: 'EuroGraphics',
        url: 'https://www.eurovis.org/',
        resources: []
    },
    {
        short: 'PacificVis',
        name: 'Pacific Visualization Symposium',
        publisher: 'IEEE',
        url: 'https://pacificvis.github.io',
        resources: []
    },
    {
        short: 'ISMAR',
        name: 'International Symposium on Mixed and Augmented Reality',
        publisher: 'IEEE',
        url: 'https://www.ismar.net/',
        resources: []
    },
    {
        short: 'MuC',
        name: 'Mensch und Computer',
        publisher: 'ACM',
        url: '',
        resources: []
    },
    {
        short: 'arXiv',
        name: 'arXiv',
        publisher: 'Cornell Tech',
        url: 'https://info.arxiv.org',
        resources: []
    },
    {
        short: 'ETRA',
        name: 'Symposium on Eye Tracking Research & Applications',
        publisher: 'ACM',
        url: 'https://etra.acm.org/',
        resources: []
    },
    {
        short: 'AVI',
        name: 'Advanced Visual Interfaces',
        publisher: 'ACM',
        url: 'https://dl.acm.org/conference/avi',
        resources: []
    },
    {
        short: 'DIS',
        name: 'Conference on Designing Interactive Systems',
        publisher: 'ACM',
        url: 'https://dis.acm.org/',
        resources: []
    },
    {
        short: 'EuroVA',
        name: 'International EuroVis Workshop on Visual Analytics',
        publisher: 'EuroGraphics',
        url: 'https://www.eurova.org/',
        resources: []
    },
    {
        short: 'CGF',
        name: 'Computer Graphics Forum',
        publisher: 'Wiley',
        url: 'https://onlinelibrary.wiley.com/journal/14678659',
        resources: []
    },
    {
        short: 'it - Information Technology',
        name: 'it - Information Technology',
        publisher: 'De Gruyter',
        url: 'https://www.degruyter.com/journal/key/ITIT/',
        resources: []
    },
    {
        short: 'ESANN',
        name: 'European Symposium on Artificial Neural Networks, Computational Intelligence and Machine Learning',
        publisher: '',
        url: 'https://www.esann.org/',
        resources: []
    },
    {
        short: 'ACM ISS',
        name: 'Interactive Surfaces and Spaces',
        publisher: 'ACM',
        url: 'https://iss.acm.org/',
        resources: []
    },
    {
        short: 'UIST',
        name: 'Symposium on User Interface Software and Technology',
        publisher: 'ACM',
        url: 'https://uist.acm.org/2023/',
        resources: []
    },
    {
        short: 'IUI',
        name: 'Annual Conference on Intelligent User Interfaces',
        publisher: 'ACM',
        url: 'https://iui.acm.org/2023/',
        resources: []
    },
    {
        short: 'CG&A',
        name: 'Computer Graphics and Applications',
        publisher: 'IEEE',
        url: 'https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=38',
        resources: []
    },
    {
        short: 'VRW',
        name: 'Virtual Reality and 3D User Interfaces Abstracts and Workshops',
        publisher: 'IEEE',
        url: 'https://ieeexplore.ieee.org/xpl/conhome/1836626/all-proceedings',
        resources: []
    },
]

export const venueMap = new Map(venues.map(d => [
    d.short,
    { ...d, pageUrl: d.short.replaceAll(' ', '_').toLowerCase() }
]))
