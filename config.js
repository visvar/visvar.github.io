// Page configuration
export const publicationSheet = './Papers.csv'
export const pageUrl = 'https://visvar.github.io'
export const pageTitle = 'VISVAR Research Group, University of Stuttgart'

/**
 * Member configuration
 * Please keep members sorted: professor, then postdocs, then phds;
 * members of the same sole sorted by first name alphabetically.
 * All fields may contain HTML
 *
 * {string} name: the same name as used on the publication dataset
 * {string} title: name with academic title(s)
 * {string} role: professor, postdoc (ommitted for phds) TODO: alumni?
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
    role: 'professor',
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
    name: 'Alexander Achberger',
    title: 'Alexander Achberger, Ph.D.',
    role: 'postdoc',
    path: 'alexander_achberger',
    bio: `
    <p>
      I am a postdoctoral researcher at VISUS (Visualization Research Center, University of Stuttgart), specializing in haptic feedback in Virtual Reality (VR).
      I completed my doctoral studies within the framework of an industry-academic collaboration with Mercedes-Benz AG and VISUS.
      During this period, I explored the integration of haptic feedback research into practical applications.
    </p>
    <p>
      My research involved the development of new haptic feedback devices tailored for automotive engineering VR tasks.
      I delved into the challenges of integrating these devices into the daily workflow of engineers.
      Currently, my focus extends beyond automotive engineering, encompassing other domains such as the entertainment industry.
    </p>
    <p>
    In addition to haptic feedback, my research interests include general human-computer interaction, VR, and AR.
    </p>
    `,
    research: ['HCI', 'Haptics', 'VR/AR'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Achberger/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=V3QAjFsAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0002-2226-6593' }
    ],
    projects: []
  },
  {
    name: 'Benjamin Lee',
    title: 'Benjamin Lee, Ph.D.',
    role: 'postdoc',
    path: 'benjamin_lee',
    bio: `
    <p>
      My research revolves around the field of Immersive Analytics: the use of virtual and/or augmented reality technologies to support visual data exploration and presentation.
      In particular, my work has investigated how 2D surfaces can be used inside of an immersive 3D space to facilitate (collaborative) visual analysis and data understanding.
    </p>
    <p>
      I submitted my PhD at the <a href="https://www.monash.edu/it/hcc/dvia-lab" target="_blank" rel="noreferrer">Data Visualisation and Immersive Analytics Lab</a>, Monash University.
      My supervisors were Prof. Tim Dwyer (main), A/Prof. Bernhard Jenny, Dr. Maxime Cordeil, and Dr. Arnaud Prouzeau.
      </p>
      `,
    research: ['Data visualization', 'Immersive analytics', 'Collaborative analysis', 'VR/AR'],
    links: [
      {
        text: "University of Stuttgart website",
        url: "https://www.visus.uni-stuttgart.de/en/institute/team/Lee-00006/"
      },
      { text: 'Google Scholar', url: 'https://scholar.google.de/citations?user=oJUHhu4AAAAJ' },
      { text: "ORCID", url: 'https://orcid.org/0000-0002-1171-4741' },
      { text: 'Personal website', url: 'https://benjaminchlee.github.io/' },
      { text: 'YouTube', url: 'https://www.youtube.com/@benjaminchlee' },
    ],
    projects: []
  },
  {
    name: 'Quynh Quang Ngo',
    title: 'Quynh Quang Ngo, Ph.D.',
    role: 'postdoc',
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
    name: 'Carlos-Victor Quijano-Chavez',
    title: 'Carlos-Victor Quijano-Chavez, M.Sc.',
    path: 'carlos-victor_quijano-chavez',
    bio: `
    <p>
    Currently, I'm a PhD student at the University of Stuttgart.
    I obtained my MSc degree in Computer Science at the Federal University of Rio Grande do Sul (UFRGS) in Porto Alegre, Brazil.
    My research focuses on applying engaging, embodied display and interaction techniques for data visualization and visual analytics in immersive environments.
    </p>
    `,
    research: ['HCI', 'Visualization'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Quijano-Chavez/' },
      { text: 'Google Scholar', url: 'https://scholar.google.de/citations?user=3_fYPGQAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0001-9129-5366' },
    ],
    projects: []
  },

  {
    name: 'Christian Krauter',
    title: 'Christian Krauter, M.Sc.',
    path: 'christian_krauter',
    bio: `
    <p>
    My research interests cover Human-Computer Interaction (HCI), information visualization, and Augmented and Virtual Reality (AR/VR), which I aim to combine during my PhD studies.
    I acquired my Bachelor's in media informatics and my Master's in computer science here at the University of Stuttgart.
    My previous work covered notification placement in VR (bachelor thesis, <a href="https://doi.org/10.1145/3311350.3347190" target="_blank" rel="noreferrer">link</a>), an immersive social distancing VR demo (<a href="https://doi.org/10.1145/3473856.3474031" target="_blank" rel="noreferrer">link</a>, <a href="https://visvar.github.io/pdf/krauter2021muc.pdf" target="_blank" rel="noreferrer">pdf</a>), and a smart chair for sitting posture recognition and feedback (master thesis).
    </p>
    `,
    research: ['HCI', 'AR/ VR', 'Information Visualization'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Krauter-00001/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=sNDlSbkAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0002-9787-0816' },
      { text: 'ResearchGate', url: 'https://www.researchgate.net/profile/Christian-Krauter-2' },
      { text: 'LinkedIn', url: 'https://www.linkedin.com/in/christian-krauter-4b8640218' }
    ],
    projects: []
  },

  {
    name: 'Frank Heyen',
    title: 'Frank Heyen, M.Sc.',
    path: 'frank_heyen',
    bio: `
    <p>
      My research focuses on data-driven music visualization that supports students and teachers.
      For example, augmented and alternative
      <a href="../pub/heyen2023visual.html" target="_blank" rel="noreferrer">
      sheet music notation</a>
      helps reading and understanding a piece more quickly.
      <a href="../pub/heyen2022datadriven.html" target="_blank" rel="noreferrer">
      Collecting and visualizing practice data</a>
      supports musicians in learning their instruments more efficiently.

      Besides audio and MIDI, such practice data may include
      <a href="../pub/heyen2022cellovis.html" target="_blank" rel="noreferrer">
      motion capture</a>
      of the musician.
      To make analysis more immersive and increase the visual connection to the instrument, visualization can be displayed in
      <a href="../pub/heyen2022cellovis.html" target="_blank" rel="noreferrer">
      virtual</a> and
      <a href="../pub/heyen2022augmented.html" target="_blank" rel="noreferrer">
      augmented reality</a>.

      My collaborations include work on visualization for
      <a href="../pub/rau2022visualization.html" target="_blank" rel="noreferrer">
      human-AI composing</a>.
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
    name: 'Hyerim Park',
    title: 'Hyerim Park, M.Sc.',
    path: 'hyerim_park',
    bio: `
    <p>
      I have a background in media informatics and human-computer interaction.
      During my master's thesis at Ludwig Maximilian Universität München, I dedicated my research to developing technical solutions that facilitate seamless communication between VR users and non-VR users in a co-located setting.
      Currently, as a doctoral candidate, my focus is on exploring novel interaction concepts and creating prototypes for collaborative creative tasks in immersive environments.

      My investigations revolve around human-AI collaboration and leverage extended reality (XR) technologies such as VR, AR, and MR.
    </p>
    `,
    research: ['HCI', 'Human-AI', 'VR/AR/MR'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Park-00004/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=n5RobrsAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0009-0006-4877-2255' },
    ],
    projects: []
  },

  {
    name: 'Jan Krieglstein',
    title: 'Dipl.-Ing. Jan Krieglstein',
    path: 'jan_krieglstein',
    bio: `
    <p>
    I'm a research associate at Fraunhofer Institute for Manifacturing Engineering and Automation IPA in Stuttgart.
    My research focuses on skill-based robot programming using Extended Reality techniques and devices.
    A proof of concept paper for robot programming using a Mixed Reality user interface can be found <a href="https://ieeexplore.ieee.org/abstract/document/10161095" target="_blank" rel="noreferrer">here</a> and a video <a href="https://www.youtube.com/watch?v=VL1_hjB78pQ" target="_blank" rel="noreferrer">here</a>.
    Future work will focus on evaluating the benefits of Mixed Reality for robot programming in a user study and further development of helpful XR-features for robot programming.
    </p>
    `,
    research: [
      'Robot programming',
      'Mixed Reality applications',
      'Contact force simulation'
    ],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Krieglstein/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=EZEkmI4AAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0003-2538-3653' },
    ],
    projects: []
  },

  {
    name: 'Jan Ulrich Bartels',
    title: 'Jan Ulrich Bartels, M.Sc.',
    path: 'jan_ulrich_bartels',
    bio: `
    <p>
    My interest is the development of interfaces which unlock more productive human-machine relationships and enhance our ability to solve complex problems. My research focuses on haptic interfaces for Augmented and Virtual Reality.
    </p>
    <p>
    I've received my Bachelors in Electrical and Computer Engineering from Oregon State University in 2016 and a Masters in Robotics from the Johns Hopkins University in 2023. In the 4 years between, I was designing audio interfaces for conference rooms and large meeting spaces.
    </p>
    `,
    research: [],
    links: [
      // { text: 'University of Stuttgart website', url: '' },
      { text: 'LinkedIn', url: 'https://www.linkedin.com/in/jubartels/' },
      { text: 'Personal website', url: 'https://janulrichbartels.com/' },

    ],
    projects: []
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
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Haischt/' },
      { text: 'Google Scholar', url: ' https://scholar.google.de/citations?user=XA7lsOMAAAAJ' },
      { text: 'ORCID', url: '0000-0002-2494-5143' },
    ],
    projects: []
  },

  {
    name: 'Jonas Vogelsang',
    title: 'Jonas Vogelsang, M.Sc.',
    path: 'jonas_vogelsang',
    bio: `
      <p>
      I'm a Ph.D. candidate at the VISUS (Visualisierungsinstitut der Universität Stuttgart), specializing in Human-Robot Interaction (HRI), Augmented Reality (AR), and Situated Visualization. I earned my Master's degree in Computer Science from the University of Stuttgart, providing a solid foundation for my current research interests.
      </p>
      <p>
      My work revolves around the practical intersections of HRI, AR, and Situated Visualization. Based at VISUS, I'm focused on contributing insights to these evolving technologies. Let's explore the potential of these fields together in shaping a tech-driven future.
      </p>
      `,
    research: ['Human-Robot Interaction', 'Augmented Reality', 'Situated Visualization'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.vis.uni-stuttgart.de/en/institute/team/Vogelsang/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=QANzDJgAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0009-0007-0563-8707' },
      { text: 'LinkedIn', url: 'https://www.linkedin.com/in/jonas-vogelsang/' },
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
      { text: 'ORCID', url: 'https://orcid.org/0000-0002-1936-0474' },
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
    name: 'Nina Doerr',
    title: 'Nina Doerr, M.Sc.',
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
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=DJBB8I8AAAAJ' },
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
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=vqiuvPMAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0003-2614-2480' }
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
      { text: 'digit@L', url: 'https://www.project.uni-stuttgart.de/digital/en/' },
      { text: 'SimTech', url: 'https://www.simtech.uni-stuttgart.de/' }
    ]
  },

  {
    name: 'Simeon Rau',
    title: 'Simeon Rau, M.Sc.',
    path: 'simeon_rau',
    bio: `
    <p>
    I conduct research on visualization for and with machine learning, mainly to support non experts in using and developing new machine learning models.
    Currently, I am working on the topic of music composition and how AI and visualization can enhance the human instead of replacing it.
      One of the answers is: Using a human centered, AI-assisted approach with visualization as efficient communication between human and AI.
      At the start I focus only on monophonic melody composition.
      Later I want to expand my research to other steps in the composition process, machine learning pipeline, and human-AI interaction to foster the human creativity, music writing,
      and bring AI to non expert people.
    </p>
    `,
    research: ['Visualization &amp; visual analytics', 'Machine learning', 'HCI'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Rau-00009/' },
      { text: 'Google Scholar', url: 'https://scholar.google.de/citations?user=QeFmHn8AAAAJ' },
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
    name: 'Vindhya Singh',
    title: 'Vindhya Singh, M.Sc.',
    path: 'vindhya_singh',
    bio: `
    <p>
      I am an IMPRS-IS Ph.D. scholar jointly supervised by Dr. Ksenia Keplinger (leader of the "Organizational Leadership & Diversity" research group) at the Max Planck Institute for Intelligent Systems and Dr. Michael Sedlmair (leader of the "Visualization and Virtual/Augmented Reality" research group) at the University of Stuttgart. I completed my M.Sc. degree in Informatics from the Technical University of Munich in the year 2020, specializing in the intersection of Machine Learning/Deep Learning and Natural Language Processing.
    </p>
    <p>
      I have worked as a Data Scientist in an inter-disciplinary environment, working in close collaboration with social scientists, journalists, and geo-political experts on tasks such as sentiment and stance detection, analyzing the propagation of fake news and language traits (toxicity and hate speech) among social media users, to name a few. I am interested in exploratory data analysis in a multi-modal setting which can be adapted across domains and organizations to foster healthier working environments.
    </p>
    `,
    research: [
      'HCI'
    ],
    links: [
      // { text: 'University of Stuttgart website', url: '' },
      // { text: 'LinkedIn', url: 'https://www.linkedin.com/in/vindhya-singh-44663762' },

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
  },
]
