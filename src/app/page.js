'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

const LoginComponent = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const { setUser } = useUser(); // Use the global state management
  const [error, setError] = useState(''); // Optional: state for handling errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // replace this with an actual API call to your backend to verify the user's credentials.
      const response = await fakeLoginAPI(username, password);
      if (response.ok) {
        // setUser({ name: username });
        router.push('/dashboard'); // Redirect to dashboard upon successful login
      } else {
        setError('Invalid username or password'); // Handle login error
      }
    } catch (err) {
      console.error(err); // Log error for debugging
      setError('Login failed. Please try again later.'); // Display a generic login error
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-[#f4e8de] shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-[#715f4e] bg-white focus:outline-none focus:ring-2 focus:ring-[#f2e4d1]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-[#715f4e] bg-white focus:outline-none focus:ring-2 focus:ring-[#f2e4d1]"
        />
        <button type="submit" className="w-full px-4 py-2 bg-[#715f4e] text-[#f4e8de] rounded-lg hover:bg-[#5d4b40]">
          Log In
        </button>
        {error && <p className="text-[#f26b1e] text-sm">{error}</p>} {/* Optionally display login error */}
      </form>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-white italic drop-shadow-2xl">Welcome to Macro Muscles</h1>
      <section className="flex-1 my-12">
        <p className="text-xl text-center font-bold text-[#736558] italic">
        Embarking on a health journey can often feel intimidating, especially for beginners who are navigating the complexities of workout routines and nutritional balance.
        Our app aims to simplify wellness by making personal health management easier and more accessible than ever.  
        Start, track, visualize your progress and get recommendation to achieve your wellness goals with us—where simplicity meets functionality. 
        Join us, and let's embark on this journey together, where every step forward is a step towards a healthier, happier you.
        </p>
        {/* You can add more content here */}
      </section>
      <section className="flex-1">
        <LoginComponent />
      </section>
    </main>
  );
}
