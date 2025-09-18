import type { ReactNode } from 'react'

type Props = {
    icon: ReactNode
    value: string
    label: string
    onClick?: () => void
}

export default function StatCard({ icon, value, label, onClick }: Props) {
    return (
        <div className="stat" onClick={onClick} role={onClick ? 'button' : undefined} tabIndex={onClick ? 0 : undefined}>
            <div className="stat__icon" aria-hidden="true">{icon}</div>
            <div className="stat__body">
                <div className="stat__value">{value}</div>
                <div className="stat__label">{label}</div>
            </div>
        </div>
    )
}
