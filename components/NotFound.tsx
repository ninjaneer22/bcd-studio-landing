import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
    <p className="text-sm tracking-[0.4em] font-medium text-google-grey uppercase mb-4">404</p>
    <h1 className="text-3xl md:text-5xl font-bold text-google-white tracking-tight mb-4">Page not found.</h1>
    <p className="text-zinc-400 mb-10">That page doesn't exist or has moved.</p>
    <Link to="/" className="buy-btn">Back to bcd.center</Link>
  </div>
);

export default NotFound;
