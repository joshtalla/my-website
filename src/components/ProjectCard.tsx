// project card component

import { useEffect, useRef, useState } from 'react'
import { useProjects } from '../contexts/ProjectsContext'

type Props = {
    title: string
    org?: string
    role?: string
    dateRange?: string
    bullets: string[]
    imageUrl?: string
    link?: string
    summary?: string
}

export default function ProjectCard({ title, org, role, dateRange, bullets, imageUrl, link, summary }: Props) {
    const { activeProject, closeProject, openProject } = useProjects()
    const [localOpen, setLocalOpen] = useState(false)
    const open = activeProject === title || localOpen
    const closeButtonRef = useRef<HTMLButtonElement | null>(null)

    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (closeProject) closeProject()
                else setLocalOpen(false)
            }
        }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [open, closeProject])

    // when open: lock body scroll and move focus to close button; when closing restore body scroll
    useEffect(() => {
        const prevOverflow = document.body.style.overflow
        if (open) {
            document.body.style.overflow = 'hidden'
            // focus close button after render
            setTimeout(() => closeButtonRef.current?.focus(), 0)
        } else {
            document.body.style.overflow = prevOverflow
        }
        return () => { document.body.style.overflow = prevOverflow }
    }, [open])

    // prevent link clicks from toggling the popout
    const stop = (e: React.MouseEvent) => e.stopPropagation()

    const onKeyActivate = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            // if using global context, open via context
            if (openProject) openProject(title)
            else setLocalOpen(true)
        }
    }

    // prepare a 3-sentence summary for the card (use provided summary or derive from bullets)
    const makeSummary = (raw?: string, fromBullets?: string[]) => {
        const text = raw && raw.trim().length > 0 ? raw : (fromBullets || []).join(' ')
        if (!text) return ''
        // split into sentences (simple split on period, question, or exclamation)
        const parts = text.split(/(?<=[\.\?!])\s+/)
        return parts.slice(0, 3).join(' ').trim()
    }

    const summaryText = makeSummary(summary, bullets)

    const CardContent = (
        <>
            {imageUrl ? (
                <div className="project-card__media">
                    {link ? (
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-card__media-link"
                            aria-label={`Open ${title}`}
                            onClick={stop}
                        >
                            <img src={imageUrl} alt={`${title} screenshot`} />
                        </a>
                    ) : (
                        <img src={imageUrl} alt={`${title} screenshot`} />
                    )}
                </div>
            ) : null}

            <header className="project-card__header">
                <h3 className="project-card__title">{title}</h3>
                <div className="project-card__meta">
                    {org && <span className="project-card__org">{org}</span>}
                    {role && <span className="project-card__role">{role}</span>}
                    {dateRange && <span className="project-card__date">{dateRange}</span>}
                </div>
            </header>

            {summaryText ? <p className="project-card__summary">{summaryText}</p> : null}
        </>
    )

    return (
        <>
            <article
                className="project-card"
                role="button"
                tabIndex={0}
                onClick={() => (openProject ? openProject(title) : setLocalOpen(true))}
                onKeyDown={onKeyActivate}
                aria-pressed={open}
            >
                {CardContent}
            </article>

            {open && (
                <div className="project-card__overlay" role="dialog" aria-modal="true" aria-label={`${title} details`} onClick={() => (closeProject ? closeProject() : setLocalOpen(false))}>
                    <div className="project-card__popout" onClick={(e) => e.stopPropagation()}>
                        <button className="project-card__close" onClick={() => (closeProject ? closeProject() : setLocalOpen(false))} ref={closeButtonRef} aria-label="Close">✕</button>
                        {imageUrl && (
                            <div className="project-card__popout-media">
                                {link ? (
                                    <a href={link} target="_blank" rel="noopener noreferrer" onClick={stop}>
                                        <img src={imageUrl} alt={`${title} screenshot`} />
                                    </a>
                                ) : (
                                    <img src={imageUrl} alt={`${title} screenshot`} />
                                )}
                            </div>
                        )}
                        <div className="project-card__popout-body">
                            <h3 className="project-card__title">{title}</h3>
                            <div className="project-card__meta">
                                {org && <span className="project-card__org">{org}</span>}
                                {role && <span className="project-card__role">{role}</span>}
                                {dateRange && <span className="project-card__date">{dateRange}</span>}
                            </div>
                            <ul className="project-card__list">
                                {bullets.map((b, i) => (
                                    <li key={i}>{b}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
