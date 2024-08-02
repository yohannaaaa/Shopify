'use client';

import Link from 'next/link';
import React, { useContext } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { EmailAuthProvider, reauthenticateWithCredential, deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, firestore } from '@/firebase/config';
import CartContext from '@/context/CartContext';  

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { logOut, userInfo } = useAuth();
  const { cart } = useContext(CartContext);  

  const isRendered = pathname !== '/sign-up' && pathname !== '/login';
  const currentUser = auth.currentUser;

  const totalQuantity = cart?.cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const handleDelete = async () => {
    try {
      if (!currentUser) {
        throw new Error('No authenticated user found');
      }

      const password = prompt('Please enter your password to confirm account deletion:');
      if (!password) {
        alert('Password is required to delete your account.');
        return;
      }

      const credential = EmailAuthProvider.credential(currentUser.email!, password);
      await reauthenticateWithCredential(currentUser, credential);

      const userDocRef = doc(firestore, 'users', currentUser.uid);
      await deleteDoc(userDocRef);

      await deleteUser(currentUser);

      console.log('Account deleted successfully');
      router.push('/sign-up');
      
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      router.push('/sign-up');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      {isRendered && (
        <div className="navbar shadow-lg shadow-bottom shadow-gray-300 bg-white">
          <div className="flex-1">
            {currentUser ? (
              <Link href="/products">
                <Image src="/logo.png" width={100} height={70} alt="logo" />
              </Link>
            ) : (
              <Link href="/">
                <Image src="/logo.png" width={100} height={70} alt="logo" />
              </Link>
            )}
          </div>
          {currentUser ? (
            <div className="flex-none">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle  ">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-1rem t-3rem"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-sm indicator-item">{totalQuantity}</span>
                  </div>
                  
                </div>
                <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-200 z-[1] mt-3 w-52 shadow"
                >
                  <div className="card-body pl-5">
                    <span className="text-lg font-bold">{totalQuantity}</span>
                    <div className="card-actions">
                      <button className="btn btn-primary btn-block" onClick={() => router.push('/cart')}>View cart</button>
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="dropdown dropdown-end mr-[-10] ml-5 pt-3">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar ">
                  <div className="w-10 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </div>
                 </div>
                
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <button onClick={() => router.push('/edit-profile')}>
                      Update account details
                    </button>
                  </li>
                  <li>
                    <a onClick={handleLogout}>Logout</a>
                  </li>
                  <li>
                    <a className='text-red-900 underline' onClick={handleDelete}>Delete Account</a>
                  </li>
                </ul>
              </div><div className='right-0 text-sm mr-10'>{userInfo?.firstName || 'User'}</div>
            </div>
          ) : (
            <div className=''>
              <Link className='border w-20 pl-2 pt-1 h-10 mr-5 text-blue-400 border-slate-300 rounded-md hover:bg-blue-900 hover:text-white hover:h-11 hover:w-18 bg-gray-100' href="/sign-up">Sign Up</Link>
              {/* <Link className='border w-20 pl-2 pt-1 h-10 mr-5 text-blue-400 border-slate-300 rounded-md hover:bg-blue-900  hover:text-white hover:h-11 hover:w-18 bg-gray-100' href="/login">Log In</Link> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Navbar;
