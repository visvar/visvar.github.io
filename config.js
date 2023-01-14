// Page configuration
export const publicationSheet = './Papers.csv'
export const pageUrl = 'https://visvar.github.io'
export const pageTitle = 'VISVAR Research Group, University of Stuttgart'

/**
 * Member configuration
 * All fields may contain HTML
 *
 * {string} name: the same name as used on the publication dataset
 * {string} title: name with academic title(s)
 * {string} path: the filename used for about/ and img/people/
 * {string} bio: bio description
 * {string[]} research: list of research interests
 * {string[]} links: links as {text:string, url:string} objects
 * {string[]} projects: projects as {text:string, url:string} objects
 *
 * Sorted by name, except for the group leader who goes first
 */
export const memberConfig = [
  // Leader
  {
    name: 'Michael Sedlmair',
    title: 'Prof. Dr. Michael Sedlmair',
    path: 'michael_sedlmair',
    bio: `
    <p>
      Michael Sedlmair is a professor at the University of Stuttgart and leads the research group for
      Visualization and Virtual/Augmented Reality there.
      He received his Ph.D. degree in Computer Science from the University of Munich, Germany, in 2010.
      Further stops included the Jacobs University Bremen, University of Vienna, University of British Columbia in Vancouver, and the BMW Group Research and Technology, Munich.
    </p>
    <p>
      His research interests focus on visual and interactive machine learning, perceptual modeling for visualization, immersive analytics and situated visualization, novel interaction technologies, as well as the methodological and theoretical foundations underlying them.
    </p>
    `,
    research: ['Visualization &amp; visual analytics', 'VR/AR', 'HCI'],
    links: [
      {
        text: "University of Stuttgart website",
        url: "https://www.vis.uni-stuttgart.de/en/institute/team/Sedlmair-00002/"
      },
      {
        text: "Google Scholar",
        url: "https://scholar.google.com/citations?user=objnJXoAAAAJ"
      },
      {
        text: "ORCID",
        url: "https://orcid.org/0000-0001-7048-9292"
      },
      {
        text: "arXiv",
        url: "https://arxiv.org/a/sedlmair_m_1.html"
      }
    ],
    projects: []
  },

  // Post-doc
  {
    name: 'Quynh Quang Ngo',
    title: 'Quynh Quang Ngo, Ph.D.',
    path: 'quynh_quang_ngo',
    bio: `
    <p>
      Quynh conducts research in the field of visualization.
      His recent research interests include dimensionality reduction techniques, data transformation, graph layout, and applying machine learning to visualization.
      He is also interested in studying the potential novel hybrid techniques among different fields of visual computing, such as visualization, eye-tracking, and virtual/augmented reality.
    </p>
    `,
    research: ['Visualization', 'Machine learning', 'Dimensionality reduction', 'Graph layout', 'VR/AR'],
    links: [
      {
        text: "University of Stuttgart website",
        url: "https://www.visus.uni-stuttgart.de/en/institute/team/Ngo-00001/"
      },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=qwIOAYAAAAAJ' },
      { text: "ORCID", url: 'https://orcid.org/0000-0001-5254-1480' }
    ],
    projects: []
  },

  // Ph.D.s
  {
    name: 'Aimee Sousa Calepso',
    title: 'Aimee Sousa Calepso, M.Sc.',
    path: 'aimee_sousa_calepso',
    bio: `
    <p>
      I'm currently a Ph.D. student and Research Assistant in Visualisierungsinstitut (VISUS), Universität Stuttgart.
      I hold a Masters degree in Computer Science from Universidade Federal do Rio Grande do Sul.
    </p>
    <p>
      My main research interests include situated visualization using wearable Augmented Reality devices and other applications.
      I also work in the Cluster of Excellence Integrative Computational Design and Construction for Architecture (<a href="https://www.intcdc.uni-stuttgart.de" target="_blank" rel="noreferrer">IntCDC</a>), helping to build solutions for the architechture and construction industry involving immersive experiences.
    </p>
    `,
    research: ['Situated visualization', 'XR applied to the construction industry', 'User studies', 'HCI'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Sousa-Calepso/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=04xWymMAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0002-6625-0585' }
    ],
    projects: [
      { text: 'IntCDC', url: 'https://www.intcdc.uni-stuttgart.de' }
    ]
  },

  {
    name: 'Alexander Achberger',
    title: 'Alexander Achberger, M.Sc.',
    path: 'alexander_achberger',
    bio: ``,
    research: ['HCI', 'Haptics'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Achberger/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=V3QAjFsAAAAJ' }
    ],
    projects: []
  },

  {
    name: 'Frank Heyen',
    title: 'Frank Heyen, M.Sc.',
    path: 'frank_heyen',
    bio: `
    <p>
      My research focuses on data-driven music visualization, mainly to support music students and teachers.
      For example, see <a href="https://vis2020-ieee.ipostersessions.com/default.aspx?s=82-F0-FF-F9-29-B9-B4-7F-FE-F3-A9-1D-4A-B7-4F-32" target="_blank" rel="noreferrer">this poster</a>
      (<a href="../pdf/heyen2020supporting.pdf" target="_blank" rel="noreferrer">PDF</a>) and
      <a href="../pdf/heyen2022datadriven.pdf" target="_blank" rel="noreferrer">paper</a>
      (<a href="https://doi.org/10.48550/arxiv.2203.13320" target="_blank" rel="noreferrer">DOI</a>,
      <a href="../video/heyen2022datadriven.mp4" target="_blank" rel="noreferrer">video</a>)
      for how collecting and visualizing training data can help musicians learn their instruments more efficiently.
      <a href="../pdf/rau2021visual.pdf" target="_blank" rel="noreferrer">Another poster</a>
      demonstrates visualization-supported collaboration between
      user and AI for composition.
    </p>
    <p>
      Future work: Leverage
      <a href="../pdf/heyen2022cellovis.pdf" target="_blank" rel="noreferrer">VR/AR, motion capturing</a>,
      and ML/AI to achieve better and more situated visual
      support for musicians.
    </p>
    `,
    research: ['Visualization &amp; visual analytics', 'Visual music analysis', 'Immersive &amp; situated analytics', 'VR/AR', 'HCI'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Heyen/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=gaha5vYAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0002-5090-0133' },
      { text: 'DBLP', url: 'https://dblp.uni-trier.de/pid/276/2843.html' },
      { text: 'arXiv', url: 'https://arxiv.org/a/heyen_f_1.html' },
      { text: 'Personal website', url: 'https://fheyen.github.io/' },
      { text: 'Observable notebooks', url: 'https://observablehq.com/@fheyen?tab=notebooks' },
    ],
    projects: [
      { text: 'CyberValley - InstruData', url: 'https://www.visus.uni-stuttgart.de/en/projects/cvrf-instrudata/' }
    ]
  },

  {
    name: 'Jonas Haischt',
    title: 'Jonas Haischt, M.Sc.',
    path: 'jonas_haischt',
    bio: `
    <p>
      I am Jonas Haischt, an external Ph.D. student at Mercedes-Benz AG, Virtual Reality Center in Sindelfingen, and
      supervised by the Visualization Research Center of the University of Stuttgart (VISUS). As part of my research,
      I focus on <i>Usable Tracking</i>. The prime example of Usable Tracking is Object Tracking, as it is usually
      easy to use. However, in many cases, Object Tracking might not work and other tracking technologies have to be
      utilized. Available techniques are often not as trivial as Object Tracking. Making these techniques accessible
      to all kinds of users is what Usable Tracking aims for.
    </p>
    `,
    research: ['Tracking for VR/AR', 'HCI'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Haischt/' }
    ],
    projects: []
  },

  {
    name: 'Katrin Angerbauer',
    title: 'Katrin Angerbauer, M.Sc.',
    path: 'katrin_angerbauer',
    bio: `
    <p>
      After my Bachelor's and Master's in Software Engineering here in Stuttgart, I started my Ph.D. at VISUS in March
      2019.
      I'm passionate about all things HCI. During my Ph.D., I research how to make visual computing more accessible
      and try to
      develop ways to assist people with all kinds of impairments.
    </p>
    `,
    research: ['HCI', 'Accessibility'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Angerbauer/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=cTB460QAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0002-1126-5288' }
    ],
    projects: []
  },

  {
    name: 'Markus Wieland',
    title: 'Markus Wieland, M.Sc.',
    path: 'markus_wieland',
    bio: `
    <p>
      My research focuses on the accessible design of VR for people with visual impairments.
      In the context of social VR spaces, I try to make non-verbal signals (e.g., eye contact, facial expressions, and gestures) perceivable during a conversation in VR for people with visual impairments via other sensory modalities.
      Of course, the substituted non-verbal signals must always be adapted to the context and be unobtrusive so that they do not override other sensory modalities of people with visual impairment in a conversation.
      This requires a user-centric approach to develop usable solutions.
      The overall goal of my research is always to increase the accessibility of VR.
    </p>
    `,
    research: ['HCI', 'Accessibility', 'Cognitive Ergonomics', 'Human Factors', 'VR/AR'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Wieland-00007/' },
      { text: 'Google Scholar', url: 'https://scholar.google.de/citations?user=3Ya8r3gAAAAJ' },
      { text: 'LinkedIn', url: 'https://de.linkedin.com/in/markus-wieland' }
    ],
    projects: []
  },

  {
    name: 'Melissa Reinelt',
    title: 'Melissa Reinelt, M.Sc.',
    path: 'melissa_reinelt',
    bio: ``,
    research: [],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Reinelt/' }
    ],
    projects: []
  },

  {
    name: 'Natalie Hube',
    title: 'Natalie Hube, M.Sc.',
    path: 'natalie_hube',
    bio: `
    <p>
      As part of my research, I focus on the usage of human representations in Virtual & Augmented Reality for
      international collaboration.
      Further areas of research interest include HCI, information visualization, and computer graphics.
      I am a PhD student at Mercedes-Benz AG, Virtual Reality Center, in Stuttgart and am supervised by the
      University of Stuttgart, VISUS, Chair of Virtual Reality and Augmented Reality.
    </p>
    <p>
      Future work: Avatars for VR/AR, Collaboration in Immersive Environments.
    </p>
    `,
    research: ['VR/AR', 'VR/AR avatars', 'HCI'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Hube/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=i0ZMFxAAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0001-9094-0271' }
    ],
    projects: []
  },

  {
    name: 'Nina Dörr',
    title: 'Nina Dörr, M.Sc.',
    path: 'nina_doerr',
    bio: `
    <p>
      During my bachelor and master studies in computer science I mainly studied perception, visualization, and AR/VR.
      In my Ph.D. thesis, I am interested in the interplay between human attention and visual highlighting in immersive environments such as AR and VR.
      In this context, my research focuses on how the attention can be drawn to relevant content and how relevant content can be highlighted appropriately for guidance in AR (and also VR).
    </p>
    `,
    research: ['Perception', 'Attention guidance', 'VR/AR', 'HCI'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Doerr-00001/' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0003-3249-5354' }
    ],
    projects: []
  },

  {
    name: 'Rene Cutura',
    title: 'Rene Cutura, M.Sc.',
    path: 'rene_cutura',
    bio: `
    <p>
      My research focuses on visualization for dimensionality reduction, especially the comparison between
      different techniques.
      I developed and maintain two open source JavaScript libraries for dimensionality reduction
      (<a href="https://github.com/saehm/DruidJS" target="_blank" rel="noreferrer">DruidJS</a>) and scatterplot gridification
      (<a href="https://github.com/saehm/hagrid" target="_blank" rel="noreferrer">Hagrid</a>).
      Besides more serious research, I occasionally explore ways to create <a
        href="https://observablehq.com/@saehrimnir/visap21" target="_blank" rel="noreferrer">data art</a> as well.
    </p>
    `,
    research: ['Visualization', 'Dimensionality reduction', 'Data art'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/institut/team/Cutura/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=bufQgtsAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0003-0395-2448' },
      { text: 'Personal website', url: 'https://renecutura.eu/' },
      { text: 'Observable notebooks', url: 'https://observablehq.com/@saehrimnir?tab=notebooks' }
    ],
    projects: []
  },

  {
    name: 'Ruben Bauer',
    title: 'Ruben Bauer, M.Sc.',
    path: 'ruben_bauer',
    bio: `
    <p>
      I research machine learning- and VR/AR-supported interactive visualization techniques to aid domain experts, who work with ensemble simulation or experimental data, in analyzing their data and visualizing their findings.
    </p>
    `,
    research: ['Visual analytics', 'Ensemble data', 'Machine learning', 'VR/AR', 'HCI'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Bauer-00029/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=vqiuvPMAAAAJ' }
    ],
    projects: []
  },

  {
    name: 'Sebastian Rigling',
    title: 'Sebastian Rigling, M.Sc.',
    path: 'sebastian_rigling',
    bio: `
    <p>
      My research focuses on the application of VR/AR in the educational field.
      I have several years of experience in Unity app development on mobile devices (iOS/Android) and
      Microsoft HoloLens for automotive training (production and after-sales) and visualization (marketing and
      production).
    </p>
    `,
    research: ['Visualization', 'VR/AR', 'HCI'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Rigling/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=PFOg1nsAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0002-2732-6276' }
    ],
    projects: [
      { text: 'digit@L', url: 'https://www.project.uni-stuttgart.de/digital/en/' }
    ]
  },

  {
    name: 'Simeon Rau',
    title: 'Simeon Rau, M.Sc.',
    path: 'simeon_rau',
    bio: `
    <p>
      I conduct research on visualization for machine learning, mainly to support students in learning.
      Currently, I am working on visualization for music composition through human-AI collaboration.
    </p>
    `,
    research: ['Visualization &amp; visual analytics', 'Machine learning', 'HCI'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Rau-00009/' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0002-3124-0467' }
    ],
    projects: []
  },

  {
    name: 'Tobias Rau',
    title: 'Tobias Rau, M.Sc.',
    path: 'tobias_rau',
    bio: ``,
    research: ['Visualization', 'VR/AR'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Rau-00005/' }
    ],
    projects: []
  },

  {
    name: 'Xingyao Yu',
    title: 'Xingyao Yu, M.Sc.',
    path: 'xingyao_yu',
    bio: `
    <p>
      I am Xingyao Yu, a Ph.D. student in Visualization Research Center (VISUS) at University of Stuttgart and
      at Stuttgart Center of Simulation Science (SimTech).
      I got my Bachelor's degree in Applied Physics and Master's degree in Optical Engineering, both at
      Beijing Institute of Technology.
    </p>
    <p>
      My research interests include wearable interaction, virtual reality, and augmented reality.
      Specifically, I have been working on the motion guidance process and biomechanical visualization in
      VR/AR environments.
      Future work: Leverage VR/AR and ML/AI for this purpose.
    </p>
    `,
    research: ['VR/AR', 'Immersive &amp; on-body visualization', 'HCI'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Yu-00009/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=9anpRnwAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0002-4249-1755' }
    ],
    projects: []
  }
]
