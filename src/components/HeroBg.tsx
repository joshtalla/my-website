import React from 'react'

type Props = React.HTMLAttributes<HTMLDivElement>

const HeroBg = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
    return <div ref={ref} className="hero__bg" aria-hidden="true" {...props} />
})

export default HeroBg
