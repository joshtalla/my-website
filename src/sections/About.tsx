import StatCard from '../components/StatCard'
import { useProjects } from '../contexts/ProjectsContext'
import './About.css'
import profilePic from '../assets/profile-pic.jpg'

export default function About() {
    const { openProject } = useProjects()

    return (
        <section className="about" id="about">
            <div className="about__inner">
                <div className="about__left">
                    <img src={profilePic} alt="Josh Talla" className="about__avatar" />
                    <h2 className="about__name">Josh Talla</h2>
                    <p className="about__highlights">Full-Stack Developer & AI Enthusiast</p>

                    <div className="about__stats">
                        <StatCard
                            icon="🏆"
                            value="Best UX"
                            label="FusionCon Award"
                            onClick={() => openProject('ZotLabs')}
                        />
                        <StatCard
                            icon="🧠"
                            value="96.72%"
                            label="Model Accuracy"
                            onClick={() => openProject('Experimental CNN-RNN Approaches for Emotion Prediction via Facial Features')}
                        />
                        <StatCard
                            icon="🤖"
                            value="Alli"
                            label="AI Social Platform"
                            onClick={() => openProject('Alli')}
                        />
                        <StatCard
                            icon="💻"
                            value="GitHub"
                            label="Check out my stuff!"
                            onClick={() => window.open('https://github.com/joshtalla', '_blank')}
                        />
                    </div>
                </div>

                <div className="about__content revamp">
                    <h2 className="about__title">About Me</h2>
                    <p className="about__sub">
                        Building the future, one line at a time
                    </p>

                    <div className="about__block">
                        <p>
                            I'm a passionate full-stack developer and AI enthusiast currently pursuing my studies at UC Irvine.
                            I love creating innovative solutions that bridge the gap between human needs and cutting-edge technology.
                        </p>
                        <p>
                            My expertise spans from building responsive web applications with modern frameworks to developing
                            intelligent systems using machine learning and AI. I'm particularly interested in the intersection
                            of human-computer interaction and emotional intelligence in technology.
                        </p>
                        <p>
                            When I'm not coding, you can find me exploring new technologies, contributing to open source projects,
                            or working on research that pushes the boundaries of what's possible with AI and web development.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
