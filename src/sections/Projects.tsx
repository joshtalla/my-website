import ProjectCard from '../components/ProjectCard'
import './Projects.css'
import reactLogo from '../assets/react.svg'
import uciThumb from '../assets/UCI Search Engine/SE_thumbnail.png'
import alliThumb from '../assets/Alli/Alli_thumbnail.png'
import paperThumb from '../assets/Paper/thumbnail.png'
import zotThumb from '../assets/ZotLabs/thumbnail.png'
import crThumb from '../assets/CR/cr-rl-agent-thumbnail.jpeg'
import mannequinThumb from '../assets/Modeling/mannequin-modeling-thumbnail.jpeg'

export default function Projects() {
    const projects = [
        {
            title: 'UCI Search Engine',
            role: 'Information Systems and Retrieval',
            dateRange: 'Dec 2024 - May 2025',
            summary: 'Search Engine based off of Unversity of California-Irvine webpages.',
            link: 'https://github.com/joshtalla/UCI-Search-Engine',
            imageUrl: uciThumb,
            bullets: [
                'Developed a high-performance search engine with a custom web crawler to index webpages from UCI, utilizing an inverted index with memory-optimized structures for sub-300ms query retrieval.',
                'Engineered ranking and filtering algorithms incorporating PageRank, SimHash, and cyclic redundancy checks for relevance scoring and similarity detection.',
                "Enhanced user experience with advanced Boolean querying and AI-powered summaries by integrating Google's generative AI."
            ]
        },
        {
            title: 'Alli',
            role: 'Artificial Intelligence, Web Development',
            dateRange: 'Feb 2025 - Mar 2025',
            summary: 'Social media web platform focused on inclusivity and connection with AI-assistance.',
            link: 'https://github.com/joshtalla/Alli',
            imageUrl: alliThumb,
            bullets: [
                'Developed an AI-driven social media platform that fosters genuine connections through anonymous, text-based interaction-reducing visual bias and promoting inclusivity.',
                'Engineered an emotionally intelligent AI social coach, merging concepts from Affective Computing, Behavioral Neuroscience, and Human-Computer Interaction to guide users in social contexts.',
                'Integrated real-time multimodal emotion recognition using HumeAI APIs, applying natural language processing, speech emotion analysis, and facial expression detection to assess user sentiment.'
            ]
        },
        {
            title: 'ZotLabs',
            role: 'Full-Stack Development, Web Development',
            dateRange: 'Dec 2024 - June 2025',
            summary: 'An award-winning platform connecting UC Irvine students and faculty for research opportunities.',
            link: 'https://github.com/aariela/ubeBytes',
            imageUrl: zotThumb,
            bullets: [
                'Engineered a full-stack platform using JavaScript and Node.js to connect UC Irvine students with faculty-led research opportunities.',
                'Implemented role-based authentication and routing using Supabase to create distinct user experiences, enabling students to apply for listings and researchers to post and manage applicants.',
                'Contributed to a platform that won the "Best User Experience Award" at FusionCon by translating final Figma UI designs into responsive and accessible components.'
            ]
        },
        {
            title: 'Experimental CNN-RNN Approaches for Emotion Prediction via Facial Features',
            role: 'Machine Learning, Data Mining',
            dateRange: 'Dec 2024 - Feb 2025',
            summary: 'Research paper on CNN-RNN hybrid models for emotion classification from facial features.',
            link: 'https://github.com/joshtalla/Emotion_Facial_Recognition',
            imageUrl: paperThumb,
            bullets: [
                "Designed and trained a deep learning model to classify human emotions using facial features from the Facial Expressions Vision Dataset (13,000+ images, 8 emotion classes).",
                'Implemented Convolutional Neural Networks (CNNs) with layered architecture (32-64-32 filters), batch normalization, and LeakyReLU activation to improve learning stability and prevent vanishing gradients.',
                'Performed image preprocessing including 50x50 resizing, grayscale conversion, and data balancing strategies that maintained controlled label variation to reduce overfitting.',
                'Conducted comparative analysis of model architectures, removing underperforming LSTM-based RNNs due to poor results on static data.',
                'Applied dropout regularization and tuned the RMSprop optimizer for faster convergence, achieving peak validation accuracy of 96.72% at epoch 3.'
            ]
        }, 
        {
            title: 'Clash Royale Non-Embedded Reinforcement Learning Agent',
            role: 'Artificial Intelligence, Reinforcement Learning, Computer Vision',
            dateRange: 'Jan 2026 - Mar 2026',
            summary: 'A reinforcement learning agent that plays Clash Royale through screen capture, computer vision, imitation learning, and reinforcement learning.',
            link: 'https://weihaog1.github.io/The-Elixir-Optimizers/index.html',
            imageUrl: crThumb,
            bullets: [
                "Developed a reinforcement learning agent that plays Clash Royale using only screen capture and computer vision, without any game API access. ",
                'Designed a two-stage learning pipeline: first trained with behavior cloning on professional human gameplay data, then fine-tuned with Proximal Policy Optimization (PPO) in live matches.',
                'Engineered a hierarchical action decomposition to manage a large discrete action space (2,305 actions), enabling efficient learning from limited data.',
                'Built a custom perception pipeline using YOLOv8 object detection, OCR for resource tracking, and card classification to extract game state from raw pixels.',
                'Created a Gymnasium-comptabile environment to interfacce with the live game, including action masking to prevent illegal moves and iterative reward shaping for effective RL training.',
                'Achieved a 30% win rate in final evaluation matches, demonstrating significant improvement over baseline and showcasing the agent\'s ability to learn real-time strategy gameplay.'
            ]
        }, 
        {
            title: '3D Mannequin Modeling (WIP)',
            role: 'Computer Vision, 3D Modeling',
            dateRange: 'Dec 2025',
            summary: 'A project focused on creating realistic 3D mannequin models using computer vision techniques.',
            link: 'https://github.com/joshtalla/mannequin-modeling',
            imageUrl: mannequinThumb,
            bullets: [
                "Developed a photogrammetry pipeline to reconstruct high-fidelity 3D meshes of a mannequin from multi-view photographs using classical computer vision. ",
                'Implemented camera calibration with checkerboard patterns to estimate intrinsic and correct lens distoration. ',
                'Automated feature extraction and matching across images using SIFT/ORB and robust matching algorithms (FLANN/BFMatcher).',
                'Built a Structure from Motion (SfM) module to estimate camera poses and triangulate sparse 3D point clouds from matches features.',
                'Integrated dense reconstruction (multi-view stereo) and surface meshing (Poisson/Ball-pivoting) to generate watertight 3D models',
            ]
        }
    ]

    return (
        <section id="projects" className="projects">
            <div className="projects__inner">
                <h2 className="projects__title">Projects</h2>
                <div className="projects__grid">
                    {projects.map((p, i) => (
                        <ProjectCard
                            key={i}
                            title={p.title}
                            role={p.role}
                            dateRange={p.dateRange}
                            summary={p.summary}
                            bullets={p.bullets}
                            imageUrl={p.imageUrl || reactLogo}
                            link={p.link || `https://github.com/your-username/${p.title.toLowerCase().split(' ').join('-')}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
