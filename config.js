// Page configuration
export const publicationSheet = './Papers.csv'
export const pageUrl = 'https://visvar.github.io'
export const pageTitle = 'HCI Stuttgart'

// keys of publications that get exempted from missing file and info checks
export const allowedMissingPDF = ['ling2021visimages']
export const allowedPDFLink = []
export const allowedArxiv = ['heyen2022cellovis', 'heyen2022datadriven', 'heyen2023tabcomp', 'kouts2023lsdvis', 'chen2022not', 'sippl2019tr', 'isenberg2014keyvis-tr', 'rijken2021illegible']
export const allowedMissingDOI = [
  'park2025design', 'talsma2024towards', 'fan2023virtual', 'zhang20233d', 'heyen2022postermidicontroller',
  'rau2021visual', 'heyen2020supporting', 'hube2018the', 'cutura2018viscoder', 'aigner2018valid',
  'oppermann2017bikesharingatlas', 'calero-valdez2017framework', 'müller2017a', 'rudkowsy2017sentiment',
  'jenny2017incivility', 'krone2017from', 'rau2017challenges', 'sacha2016esann', 'hube2016virtual', 'niederer2016ffh',
  'torsneyweir2015decision', 'sedlmair2012tr', 'sedlmair2011auto', 'baur2010infovisHS', 'isenberg2010covis',
  'ruhland2009ijac', 'sedlmair2008cscw', 'heyen2022augmented'
]

/**
 * Member configuration
 * Please keep members sorted: professor, then postdocs, then phds, then associated (postdocs, phds), then alumni (postdocs, phds);
 * members of the same sole sorted by first name alphabetically.
 * All fields may contain HTML
 *
 * {string} name: the same name as used on the publication dataset
 * {string} title: name with academic title(s)
 * {string} role: professor, postdoc (ommitted for phds), alumnus
 * {string} path: the filename used for about/ and img/people/
 * {string} bio: bio description
 * {string[]} research: list of research interests
 * {string[]} links: links as {text:string, url:string} objects
 * {string[]} projects: projects as {text:string, url:string} objects
 *
 * Sorted by leader, postdocs, phds, associated postdocs, associated phds, alumni postdocs, alumni phds
 * Then sorted by name
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

  // Postdocs
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
    name: 'Elias Elmquist',
    title: 'Elias Elmquist, Ph.D.',
    role: 'postdoc',
    path: 'elias_elmquist',
    bio: `
    <p>
      I am a postdoctoral researcher at VISUS (Visualization Research Center, University of Stuttgart), conducting research on the creation of audiovisual data representations through the integration of visualization and sonification, the method of using sound to convey information. Sonification and can be used as a complement to visualization to convey additional information, or to present the same data through another perceptual modality, which could make it easier to understand and appreciate the information.
    </p>
    <p>  
      I completed my doctoral studies at Linköping University, where I integrated sonification and visualization in different domains, such as astronomy and air traffic control. This research was conducted in a human-centered manner by collaborating with visualization developers and domain experts throughout the design process of the sonification. The sonifications were integrated with the environment where the accompanied visualization was displayed to create a realistic proof-of-concept of the design. The environment was also often used as the evaluation platform for conducting evaluations with the users of the visualization to evaluate the contribution of the sonification in an ecologically valid manner.
    </p> 
    <p>   
      My postdoctoral project involves to extend my research into applications in extended reality, and utilize audiovisual integration in other domains.
    </p>
    `,
    research: ['Sonification', 'Audiovisual integration', 'Visualization', 'VR/AR'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/team/Elmquist/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com.au/citations?user=m-DjCWMAAAAJ&hl' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0001-5874-6356' },
      { text: 'LinkedIn', url: 'https://www.linkedin.com/in/elias-elmq/' }
    ],
    projects: []
  },
  {
    name: 'Sophie Sadler',
    title: 'Sophie Sadler, Ph.D.',
    role: 'postdoc',
    path: 'sophie_sadler',
    bio: `
    <p>
      I am a postdoctoral researcher at VISUS (Visualization Research Center, University of Stuttgart), conducting research relating to visualization of high-dimensional data and dimensionality reduction. I completed my PhD at Swansea University, studying explainable artificial intelligence (XAI), often through the use of visual analytics, and often on problems where data is graph or network-based (e.g. social networks). I also spent a substantial portion of my PhD working in the Core Data Science group at Meta and was previously an AI Resident at Microsoft Research Cambridge.
    </p>
    `,
    research: ['Visualization', 'Dimensionality Reduction', 'Machine Learning'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/team/Sadler/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=MZtjY2YAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0001-9896-9079' }
    ],
    projects: []
  },

  // Phds
  {
    name: 'Aimée Sousa Calepso',
    title: 'Aimée Sousa Calepso, M.Sc.',
    role: 'phd',
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
    name: 'Christian Krauter',
    title: 'Christian Krauter, M.Sc.',
    role: 'phd',
    path: 'christian_krauter',
    bio: `
    <p>
    My research interests cover Human-Computer Interaction (HCI), information visualization, and Augmented and Virtual Reality (AR/VR), and I plan to combine these areas during my Ph.D. studies.
    </p>
    <p>
    I completed my Bachelor’s degree in media informatics, followed by a Master’s degree in computer science, both at the University of Stuttgart.
    Currently, I am pursuing my Ph.D. at the same university.
    My previous work covered notification placement in VR (bachelor thesis, <a href="https://doi.org/10.1145/3311350.3347190" target="_blank" rel="noreferrer">link</a>), an immersive social distancing VR demo (<a href="https://doi.org/10.1145/3473856.3474031" target="_blank" rel="noreferrer">link</a>, <a href="https://visvar.github.io/pdf/krauter2021muc.pdf" target="_blank" rel="noreferrer">pdf</a>), and a smart chair for sitting posture recognition and feedback (master thesis).
    </p>
    <p>
    Please contact me if you are interested in thesis writing or collaboration opportunities or have any questions about my research. I look forward to hearing from you.
    </p>
    `,
    research: ['HCI', 'AR/ VR', 'Information Visualization'],
    links: [
      { text: 'Website', url: 'https://www.chriskrauter.de/' },
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
    role: 'phd',
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
      human-AI composing</a> and participating in the <a href="https://www.visual-computing.org/2024/05/15/dr4et-hackathon-dimensionality-reductions-for-eye-tracking/"  target="_blank" rel="noreferrer">DR4ET hackathon</a>.
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
      { text: 'Observable notebooks', url: 'https://observablehq.com/@fheyen?direction=desc&sort=likes' },
    ],
    projects: [
      { text: 'CyberValley - InstruData', url: 'https://www.visus.uni-stuttgart.de/en/projects/cvrf-instrudata/' },
    ]
  },
  {
    name: 'Hyerim Park',
    title: 'Hyerim Park, M.Sc.',
    role: 'phd',
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
    role: 'phd',
    path: 'jan_krieglstein',
    bio: `
    <p>
    My research focuses how to support industrial robot programming with techniques of extended reality.
    A proof of concept paper for robot programming using a Mixed Reality user interface can be found <a href="https://ieeexplore.ieee.org/abstract/document/10161095" target="_blank" rel="noreferrer">here</a> and a video <a href="https://www.youtube.com/watch?v=VL1_hjB78pQ" target="_blank" rel="noreferrer">here</a>.
    To incorporate XR into today’s robot programming workflow, we evaluated a hybrid user interface consisting of a classical desktop interface and AR visualization in an expert user study here.
    Furthermore, I want to explore how classical robot teaching can be supported by AR/XR.
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
    role: 'phd',
    path: 'jan_ulrich_bartels',
    bio: `
    <p>
    My interest is the development of interfaces which unlock more productive human-machine relationships and enhance our ability to solve complex problems. My research focuses on haptic interfaces for Augmented and Virtual Reality.
    </p>
    <p>
    I've received my Bachelors in Electrical and Computer Engineering from Oregon State University in 2016 and a Masters in Robotics from the Johns Hopkins University in 2023. In the 4 years between, I was designing audio interfaces for conference rooms and large meeting spaces.
    </p>
    `,
    research: [
      'Human-Computer Interaction (HCI)',
      'Human-Robot Interaction (HRI)',
      'Haptics',
      'Mixed Reality'
    ],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/team/Bartels-00002/' },
      { text: 'Max Planck Institute website', url: 'https://is.mpg.de/person/jub' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=d-wuTzgAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0001-7624-2653' },
      { text: 'LinkedIn', url: 'https://www.linkedin.com/in/jubartels/' },
      { text: 'Personal website', url: 'https://janulrichbartels.com/' },
    ],
    projects: []
  },
  {
    name: 'Janet Mazur',
    title: 'Janet Mazur, M.Sc.',
    role: 'phd',
    path: 'janet_mazur',
    bio:`
    <p>
    In my research, I focus on <i>VR Driving Simulation</i> and how immersion and realism can be enhanced by adding G-Force feedback. I am an external Ph.D. student from Mercedes-Benz AG, Virtual Reality Center, and supervised by the Visualization Research Center of the University of Stuttgart (VISUS).
    <p>
    `,
    research: ['VR/AR', 'HCI', 'Driving Simulation', 'Robotics'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/team/Mazur-00001/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=c6-2mpQAAAAJ&hl=de'},
      { text: 'ORCID', url: '0009-0001-4480-1438' },
    ],
    projects: []
  },
  {
    name: 'Jonas Haischt',
    title: 'Jonas Haischt, M.Sc.',
    role: 'phd',
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
    role: 'phd',
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
    role: 'phd',
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
      { text: 'ORCID', url: 'https://orcid.org/0000-0002-1126-5288' },
    ],
    projects: []
  },
  {
    name: 'Markus Wieland',
    title: 'Markus Wieland, M.Sc.',
    role: 'phd',
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
      { text: 'Website', url: 'https://www.markuswieland.net/' },
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Wieland-00007/' },
      { text: 'Google Scholar', url: 'https://scholar.google.de/citations?user=3Ya8r3gAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0002-1936-0474' },
      { text: 'LinkedIn', url: 'https://de.linkedin.com/in/markus-wieland' }
    ],
    projects: []
  },
  {
    name: 'Natalie Hube',
    title: 'Natalie Hube, M.Sc.',
    role: 'phd',
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
    role: 'phd',
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
    name: 'Regine Lendway',
    title: 'Regine Lendway, M.Sc.',
    role: 'phd',
    path: 'regine_lendway',
    bio: `
    <p>
      I am a PhD student working on human-centered approaches to intention prediction in immersive and interactive systems.
      My research interests lie at the intersection of human-computer interaction, human-robot interaction, and extended reality,
      with a focus on gaze and motion as signals for anticipating user actions.
      I completed both my Bachelor’s and Master’s degrees in computer science at the University of Tübingen.
    </p>
    `,
    research: ['Human-Robot Interaction', 'Human-Computer Interaction', 'Augmented Reality', 'Multimodal Sensing'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.vis.uni-stuttgart.de/en/institute/team/Lendway/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?hl=de&user=G-DRzdMAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0009-0006-2884-897X' },
      { text: 'LinkedIn', url: 'https://www.linkedin.com/in/regine-lendway-683868211/' }
    ],
    projects: []
  },
  {
    name: 'Rene Cutura',
    title: 'Rene Cutura, M.Sc.',
    role: 'phd',
    path: 'rene_cutura',
    bio: `
    <p>
      My research focuses on visualization for dimensionality reduction, especially the comparison between
      different techniques.
      I developed and maintain two open-source JavaScript libraries for dimensionality reduction
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
      { text: 'Observable notebooks', url: 'https://observablehq.com/@saehrimnir?direction=desc&sort=likes' }
    ],
    projects: []
  },
  {
    name: 'Ruben Bauer',
    title: 'Ruben Bauer, M.Sc.',
    role: 'phd',
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
    name: 'Samuel Beck',
    title: 'Samuel Beck, M.Sc.',
    role: 'phd',
    path: 'samuel_beck',
    bio: `
    <p>
      My research interests include information visualization and visual analytics in general, focusing on visual analysis of cultural heritage data and sports visualization in particular.
      I obtained my master's degree in Software Engineering from the University of Stuttgart in 2020.
      My previous work covers visual curation, analysis, and narration of cultural heritage objects and biographies, and a visualization framework for planning and assessing formation dance choreographies.
      My current research investigates novel ways to facilitate formation dance practice with augmented reality methods.
    </p>
    `,
    research: ['Information Visualization', 'Visual Analytics', 'VR/AR'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.vis.uni-stuttgart.de/en/team/Beck-00004' },
      { text: 'Google Scholar', url: 'https://scholar.google.de/citations?&user=Ksiy8oMAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0003-0596-6333' }
    ],
    projects: [
      { text: 'InTaVia', url: 'https://www.vis.uni-stuttgart.de/en/research/projects/eu-intavia/' },
    ]
  },
  {
    name: 'Sebastian Rigling',
    title: 'Sebastian Rigling, M.Sc.',
    role: 'phd',
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
    role: 'phd',
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
    name: 'Tessa M. W. Talsma',
    title: 'Tessa M. W. Talsma, M.Sc.',
    role: 'phd',
    path: 'tessa_talsma',
    bio: `
    <p>

    </p>`,
    research: ['Human Computer Interaction', 'Automotive', 'Motion Perception', 'Driving Simulator', 'Virtual Reality'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/team/Talsma/' },
      { text: 'Google Scholar', url: 'https://scholar.google.de/citations?user=nMzn54MAAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0001-9653-8283' }
    ],
    projects: []
  },
  {
    name: 'Tobias Rau',
    title: 'Tobias Rau, M.Sc.',
    role: 'phd',
    path: 'tobias_rau',
    bio: `
    <p>
      My research focuses on hybrid analysis on desktop and in augmented reality for chemical structure simulations (see <a href="https://charpack.github.io/" target="_blank" rel="noreferrer">charpack.github.io</a>).
      This project is part of the <a href="https://www.simtech.uni-stuttgart.de/exc/" target="_blank" rel="noreferrer">Cluster of Excellence EXC 2075 "Data-Integrated Simulation Science (SimTech)"</a> of the University of Stuttgart and a joint effort of the <a href="https://www.itheoc.uni-stuttgart.de/" target="_blank" rel="noreferrer">Institute for Theoretical Chemistry</a> and the <a href="https://www.visus.uni-stuttgart.de/en/" target="_blank" rel="noreferrer">Visualization Research Center (VISUS)</a>.
    </p>`,
    research: ['Visualization', 'VR/AR'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Rau-00005/' },
      { text: 'Google Scholar', url: 'https://scholar.google.de/citations?user=Yi_QVJ8AAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0002-3310-9163' }
    ],
    projects: [
      { text: 'Cluster of Excellence EXC 2075 "Data-Integrated Simulation Science (SimTech)', url: 'https://www.simtech.uni-stuttgart.de/exc/' }
    ]
  },
  {
    name: 'Vindhya Singh',
    title: 'Vindhya Singh, M.Sc.',
    role: 'phd',
    path: 'vindhya_singh',
    bio: `
    <p>
    I am an IMPRS-IS Ph.D. scholar jointly supervised by Dr. Ksenia Keplinger (leader of the "Organizational Leadership & Diversity" research group) at the Max Planck Institute for Intelligent Systems and Dr. Michael Sedlmair (leader of the "Visualization and Virtual/Augmented Reality" research group) at the University of Stuttgart. I completed my M.Sc. degree in Informatics from the Technical University of Munich in the year 2020, specializing in the intersection of Machine Learning/Deep Learning and Natural Language Processing.
    </p>
    <p>
    I am interested in exploratory data analysis in a multi-modal setting which can be adapted across domains and organizations to foster healthier working environments.
    </p>
    `,
    research: [
      'HCI'
    ],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/team/Singh-00003/' },
      { text: 'Google Scholar', url: 'https://scholar.google.com/citations?user=o5m76F4AAAAJ' },
      { text: 'ORCID', url: 'https://orcid.org/0009-0008-6919-1673' }

    ],
    projects: []
  },

  // associated postdocs
  {
    name: 'Tanja Blascheck',
    title: 'Dr. Tanja Blascheck',
    role: 'associatedpostdoc',
    path: 'tanja_blascheck',
    bio: `
    <p>
    Tanja Blascheck is a Margarete-von-Wrangell Fellow and works at the Institute for Visualization and Interactive Systems at the University of Stuttgart. She received her Ph.D. degree in Computer Science from the University of Stuttgart, Germany, in 2017. She was a PostDoc at Aviz, INRIA, France, and during a research stay visited the University of Calgary in Alberta, Canada.
    </p>
    <p>
    Her main research areas are information visualization, visual analytics, human-computer interaction, and mixed reality. She focuses on evaluation, perception, and development of novel hardware especially in the context of wearable and mobile devices such as smartwatches, fitness bands, smartrings, and augmented reality headsets.
    </p>
    <p>
    Picture: Max Kovalenko, SimTech.
    </p>
    `,
    research: ['Information Visualization', 'HCI', 'AR/ VR', 'Wearable Devices', 'Micro Visualization', 'Evaluation'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.vis.uni-stuttgart.de/team/Blascheck/' },
      { text: 'Google Scholar', url: 'https://scholar.google.de/citations?user=-MKDCgIAAAAJ&hl' },
      { text: 'ORCID', url: 'https://orcid.org/0000-0003-4002-4499' },
      { text: 'A complete list of publications', url: 'https://www.vis.uni-stuttgart.de/team/Blascheck/' },
    ],
    projects: []
  },

  // associated phds
  {
    name: 'Carlos Quijano-Chavez',
    title: 'Carlos Quijano-Chavez, M.Sc.',
    role: 'associatedphd',
    path: 'carlos_quijano-chavez',
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
    name: 'Fairouz Grioui',
    title: 'Fairouz Grioui, M.Sc.',
    role: 'associatedphd',
    path: 'fairouz_grioui',
    bio: `
    <p>
    My research focuses on the study of small-scale visualizations on wearable devices along with interaction techniques for mobile contexts.
    </p>
    <p>
    I completed my Master’s degree in Human-Computer Interaction at the University of Paris-Saclay in France.
    Currently, I am pursuing my Ph.D. at the University of Stuttgart.
    In my previous work I explored micro visualization reading under locomotion such as while <a href="https://doi.org/10.1109/VIS55277.2024.00017" target="_blank" rel="noreferrer">walking and jogging</a> or <a href="http://doi.org/10.5220/0011665500003417" target="_blank" rel="noreferrer">playing a tennis-like game in VR</a>), and in motion to assist patients with (<a href="http://doi.org/10.2312/evp.20241090" target="_blank" rel="noreferrer">wrist rehabilitation exercises at home</a>).
    </p>
    `,
    research: ['Micro Visualization', 'Mobile Visualization', 'Information Visualization', 'HCI', 'AR/VR'],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.vis.uni-stuttgart.de/team/Grioui/' },
      { text: 'Google Scholar', url: 'https://scholar.google.de/citations?user=1hOQxBIAAAAJ&hl=de&oi=ao' },
      { text: 'ORCID', url: 'https://orcid.org/0009-0001-7358-6749' },
      { text: 'ResearchGate', url: 'https://www.researchgate.net/profile/Fairouz-Grioui' },
      { text: 'LinkedIn', url: 'https://www.linkedin.com/in/fayrouzgrioui/' }
    ],
    projects: []
  },

  // alumni posdocs
  {
    name: 'Benjamin Lee',
    title: 'Benjamin Lee, Ph.D.',
    role: 'alumnuspostdoc',
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
    role: 'alumnuspostdoc',
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

  // alumni phds
  {
    name: 'Cristina Morariu',
    title: 'Cristina Morariu, M.Sc.',
    role: 'alumnusphd',
    path: 'cristina_morariu',
    bio: `
    <p>
    Cristina Morariu studied computer science with a focus on "Scientific Computing" (bachelor) at the University of Vienna and followed by a master degree specializing in "Operational Research with Data Science" at the University of Edinburgh. Her focus lied on visual perception and dimensionality reduction. Due to personal reasons, Cristina had to leave VISUS in 2022. She is now working as a data scientist at Amazon in London.
    </p>
    `,
    research: [],
    links: [
      {
        text: "University of Stuttgart website",
        url: "https://www.visus.uni-stuttgart.de/en/team/Morariu/"
      },
      { text: 'Google Scholar', url: 'https://scholar.google.de/citations?user=S-jkoHAAAAAJ' },
    ],
    projects: []
  },
  {
    name: 'Magdalena Schwarzl',
    title: 'Magdalena Schwarzl, M.Sc.',
    role: 'alumnusphd',
    path: 'magdalena_schwarzl',
    bio: `
    <p>
    Magdalena Schwarzl studied computer science, first at the University of Vienna specializing in "Scientific Computing" (bachelor) and then at the University of Utah, USA specializing in "Data Visualization and Computer Graphics" (master). From January to December 2019 she worked as a doctoral researcher in Prof. Dr. Michael Sedlmair's lab group at the Visualization Research Center of the University of Stuttgart (VISUS). Her dissertation topic concerned visualization in augmented and virtual reality. Sadly,
    <a href="https://www.vis.uni-stuttgart.de/aktuelles/news/Nachruf-auf-ehemalige-VISUS-Doktorandin-Magdalena-Schwarzl/" target="_blank" rel="noreferrer">
    Magdalena passed away
    </a>
    on June 22nd 2022 after a long-lasting sickness.
    </p>
    `,
    research: [],
    links: [
      {
        text: "University of Stuttgart website",
        url: "https://www.visus.uni-stuttgart.de/en/team/Schwarzl/"
      }
    ],
    projects: []
  },
  {
    name: 'Melissa Reinelt',
    title: 'Melissa Reinelt, M.Sc.',
    role: 'alumnusphd',
    path: 'melissa_reinelt',
    bio: ``,
    research: [],
    links: [
      { text: 'University of Stuttgart website', url: 'https://www.visus.uni-stuttgart.de/en/institute/team/Reinelt/' }
    ],
    projects: []
  },
  {
    name: 'Xingyao Yu',
    title: 'Xingyao Yu, M.Sc.',
    role: 'alumnusphd',
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
      { text: 'ORCID', url: 'https://orcid.org/0000-0002-4249-1755' },
      { text: 'Personal website', url: 'https://xxxhhhyxy.github.io' }
    ],
    projects: []
  },
]
