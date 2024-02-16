import React from "react"

import QRCode from 'qrcode.react'


export default function QRCodeGenerator({data,size}) {
    return(
        <div className="flex flex-row justify-center mb-4">
            <QRCode value={data} size={size}/>
        </div>
    )
}