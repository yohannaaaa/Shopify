
import React from 'react'

function Footer() {
  return (
    <footer className="footer bg-black text-white p-10">
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className=" hover:text-gray-500 hover:cursor-pointer">Branding</a>
    <a className=" hover:text-gray-500 hover:cursor-pointer">Design</a>
    <a className=" hover:text-gray-500 hover:cursor-pointer">Marketing</a>
    <a className=" hover:text-gray-500 hover:cursor-pointer">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className=" hover:text-gray-500 hover:cursor-pointer">About us</a>
    <a className=" hover:text-gray-500 hover:cursor-pointer">Contact</a>
    <a className=" hover:text-gray-500 hover:cursor-pointer">Jobs</a>
    <a className=" hover:text-gray-500 hover:cursor-pointer">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className=" hover:text-gray-500 hover:cursor-pointer">Terms of use</a>
    <a className=" hover:text-gray-500 hover:cursor-pointer">Privacy policy</a>
    <a className=" hover:text-gray-500 hover:cursor-pointer">Cookie policy</a>
  </nav>
</footer> 
  )
}

export default Footer