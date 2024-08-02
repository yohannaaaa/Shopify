
import React from 'react'

function Footer() {
  return (
    <footer className="footer bg-black text-neutral-content bottom-0 p-10">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover hover:text-blue-900">Branding</a>
    <a className="link link-hover hover:text-blue-900">Design</a>
    <a className="link link-hover hover:text-blue-900">Marketing</a>
    <a className="link link-hover hover:text-blue-900">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover hover:text-blue-900">About us</a>
    <a className="link link-hover hover:text-blue-900">Contact</a>
    <a className="link link-hover hover:text-blue-900">Jobs</a>
    <a className="link link-hover hover:text-blue-900">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover hover:text-blue-900">Terms of use</a>
    <a className="link link-hover hover:text-blue-900">Privacy policy</a>
    <a className="link link-hover hover:text-blue-900">Cookie policy</a>
  </nav>
</footer> 
  )
}

export default Footer