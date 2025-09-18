import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'

export type MathChallenge = { a: number; b: number; answer: number }

function randomMathChallenge(): MathChallenge {
    const a = Math.floor(Math.random() * 8) + 2
    const b = Math.floor(Math.random() * 8) + 2
    return { a, b, answer: a + b }
}

type Props = {
    onValidate?: (valid: boolean) => void
}

// forwardRef so parent can read the current value if needed
const MathCaptcha = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
    const [math, setMath] = useState(() => randomMathChallenge())
    const inputRef = useRef<HTMLInputElement | null>(null)

    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement)

    useEffect(() => {
        props.onValidate?.(false)
    }, [])

    const reset = () => setMath(randomMathChallenge())

    return (
        <label className="contact__label contact__math">
            <span>To prevent spam, what is {math.a} + {math.b}?</span>
            <input
                ref={inputRef}
                name="math"
                type="number"
                required
                className="contact__input"
                onBlur={() => {
                    const val = inputRef.current?.value ?? ''
                    const ok = Number(val) === math.answer
                    props.onValidate?.(ok)
                    if (!ok) reset()
                }}
            />
        </label>
    )
})

export default MathCaptcha
