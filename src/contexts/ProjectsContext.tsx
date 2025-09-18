import React, { createContext, useContext, useState } from 'react'

type ProjectsContextType = {
    activeProject: string | null
    openProject: (title: string) => void
    closeProject: () => void
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined)

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
    const [activeProject, setActiveProject] = useState<string | null>(null)

    const openProject = (title: string) => setActiveProject(title)
    const closeProject = () => setActiveProject(null)

    return (
        <ProjectsContext.Provider value={{ activeProject, openProject, closeProject }}>
            {children}
        </ProjectsContext.Provider>
    )
}

export function useProjects() {
    const ctx = useContext(ProjectsContext)
    if (!ctx) throw new Error('useProjects must be used inside ProjectsProvider')
    return ctx
}

export default ProjectsContext
