import './About.css'
import profilePic from '../assets/profile-pic.jpg'
import StatCard from '../components/StatCard'
import { useProjects } from '../contexts/ProjectsContext'

export default function About() {
    const { openProject } = useProjects()
    return (
        <section id="about" className="about">
            <div className="about__inner revamp">
                <aside className="about__left">
                    <img loading="lazy" className="about__avatar" src={profilePic} alt="Josh Talla" />
                    <h3 className="about__name">Josh Talla</h3>
                    <p className="about__highlights">Computer Science @ UCI • Web Developer • Full-Stack Developer</p>

                    <div className="about__stats">
                        <StatCard icon="🏆" value="Best UX" label="FUSION Demo Day" onClick={() => openProject && openProject('ZotLabs')} />
                        <StatCard icon="🧠" value="96.72%" label="Model accuracy" onClick={() => openProject && openProject('Experimental CNN-RNN Approaches for Emotion Prediction via Facial Features')} />
                        <StatCard icon="🤖" value="Alli" label="AI social coach" onClick={() => openProject && openProject('Alli')} />
                    </div>
                </aside>

                <div className="about__content revamp">
                    <h2 className="about__title">About</h2>

                    <section className="about__block">
                        <h4 className="about__sub">My Mission</h4>
                        <p><strong>Hello!</strong> I'm Josh Talla, a Computer Science student at the University of California-Irvine with a passion for building applications that are both intelligent and deeply user-centric. My coursework in <strong>Machine Learning</strong>, <strong>Artificial Intelligence</strong>, and <strong>Natural Language Processing</strong> has equipped me to tackle complex technical challenges and create data-driven solutions.</p>
                    </section>

                    <section className="about__block">
                        <h4 className="about__sub">Intelligent Applications</h4>
                        <p>I believe the most impactful technology is that which understands and enhances human interaction. This belief drove me to create <strong>Alli</strong>, an AI-powered social media platform designed to foster genuine connections through anonymous, text-based interactions. The platform features an emotionally intelligent AI social coach that leverages Affective Computing and <strong>HumeAI</strong> APIs to guide users through multimodal emotion recognition. I have also engineered a high-performance search engine for UCI that uses AI-powered summaries and designed a deep learning model that classifies human emotions from facial features with <strong>96.72% accuracy</strong>.</p>
                    </section>

                    <section className="about__block">
                        <h4 className="about__sub">User-Centric Design</h4>
                        <p>My professional experience is centered on creating polished and intuitive digital experiences. As a Web Developer for <strong>Steelicon</strong>, I develop clean, modern, and responsive user interfaces using <strong>React</strong>. I translate business requirements into high-fidelity prototypes in Figma and build reusable, component-based UI elements to ensure scalability and maintainability. My work as a Full-Stack Developer on <strong>ZotLabs</strong> was awarded <strong>"Best User Experience"</strong> at FUSION Demo Day for its intuitive interface and student-centric workflows.</p>
                    </section>

                    <section className="about__block">
                        <h4 className="about__sub">Other Work</h4>
                        <p>Whether it's optimizing a website for performance and SEO or tutoring the next generation of coders in Python and JavaScript, I am committed to writing clean code and solving problems creatively. I am always excited to apply my skills in software architecture and data science to build applications that are not only functional and scalable but also accessible and engaging for everyone.</p>
                    </section>
                </div>
            </div>
        </section>
    )
}
