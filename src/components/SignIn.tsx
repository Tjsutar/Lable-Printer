// Signin.tsx
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';  // Modular imports
import { app } from '../firebaseConfig'; // Import the initialized Firebase app

const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Initialize Firebase Auth instance using the app
  const auth = getAuth(app);

  const handleSignin = async (event: React.FormEvent) => {
    event.preventDefault();

    setLoading(true);
    setError(''); // Clear any previous error

    try {
      // Attempt to sign in with the provided email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully:', userCredential.user);
      // You can redirect the user or handle post-signin actions here
    } catch (error: any) {
      setError(error.message); // Set the error message from Firebase
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSignin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
