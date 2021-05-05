import React from 'react'
import getContrastYIQ from "./helpers"

const Copied = ({color}) => {
    return (
        <div className="copied" style={{
            "--bgColor": `#${color}`,
            "--text-color": `${getContrastYIQ(color)}`,
          }}
          data-clipboard-text={`#${color}`}>
           Copied #{color} to Clipboard
        </div>
    )
}

export default Copied
