import React from 'react'
import "./ContactUs.css"

export default function ContactUs() {
  return (
   <div id="contact" className='parent'>
      <h2>Contact Us</h2>
        <div className='icons'>
            {/* facebook */}
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><g fill="currentColor"><path d="M16-.034C7.159-.034-.035 7.158-.035 16S7.159 32.034 16 32.034S32.035 24.842 32.035 16S24.841-.034 16-.034m0 31C7.748 30.966 1.035 24.252 1.035 16S7.748 1.034 16 1.034S30.965 7.748 30.965 16S24.252 30.966 16 30.966"/><path d="M19.5 7h-2.668C13.434 6.966 13 9.069 13 11.345V13h-1.5a.445.445 0 0 0-.5.5v3a.445.445 0 0 0 .5.5H13v7.5a.45.45 0 0 0 .503.5h3.055c.295.034.534-.205.44-.5L17 17h2.5a.445.445 0 0 0 .5-.5v-3a.445.445 0 0 0-.5-.5h-2.503L17 11.5c.097-.639.097-.535.69-.5h1.789c.139-.031.287-.014.391-.115s.164-.239.129-.385v-3A.444.444 0 0 0 19.5 7m-.535 2.944l-1.254-.048c-1.553 0-1.683.843-1.683 1.706l-.004 1.896a.534.534 0 0 0 .534.535H19v1.932h-2.44a.535.535 0 0 0-.535.534L16.024 24H14v-7.5c0-.295-.201-.534-.497-.534H12v-1.932h1.503a.53.53 0 0 0 .378-.156c.1-.101.118-.237.118-.379v-2.155c0-2.242.453-3.31 2.832-3.31h2.133v1.91z"/></g></svg>
            {/* ig */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="17" cy="7" r="1.5" fill="currentColor" fill-opacity="0"><animate fill="freeze" attributeName="fill-opacity" begin="1.3s" dur="0.15s" values="0;1"/></circle><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="72" stroke-dashoffset="72" d="M16 3c2.76 0 5 2.24 5 5v8c0 2.76 -2.24 5 -5 5h-8c-2.76 0 -5 -2.24 -5 -5v-8c0 -2.76 2.24 -5 5 -5h4Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="72;0"/></path><path stroke-dasharray="28" stroke-dashoffset="28" d="M12 8c2.21 0 4 1.79 4 4c0 2.21 -1.79 4 -4 4c-2.21 0 -4 -1.79 -4 -4c0 -2.21 1.79 -4 4 -4"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.7s" dur="0.6s" values="28;0"/></path></g></svg>
            {/* whatsapp */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"/></svg>
        </div>
        <div className='aboutus'>
  We are TRUHOME APPARELS, bringing you comfort, style, and confidence.
  Follow us on our socials and stay updated with the latest collections.
</div>
    </div>
  )
}
