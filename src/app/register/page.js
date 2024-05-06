'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

const RegisterComponent = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  // const { setUser } = useUser(); // Use the global state management
  const [error, setError] = useState(''); // Optional: state for handling errors

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // replace this with an actual API call to your backend to verify the user's credentials.
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        // setUser({ name: username });
        router.push('/login'); 
      } else {
        setError('Could not register. Please try again.'); // Handle login error
      }
    } catch (err) {
      console.error(err); // Log error for debugging
      setError('Could not register. Please try again.'); 
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
            <label htmlFor="dob" className="text-gray-700 font-semibold">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              placeholder="DOB"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          <input
          type="text"
          placeholder="height cm"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-[#715f4e] bg-white focus:outline-none focus:ring-2 focus:ring-[#f2e4d1]"
        />
        <input
          type="text"
          placeholder="weight kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg text-[#715f4e] bg-white focus:outline-none focus:ring-2 focus:ring-[#f2e4d1]"
        />

        <button type="submit" className="w-full px-4 py-2 bg-[#715f4e] text-[#f4e8de] rounded-lg hover:bg-[#5d4b40]">
          Register
        </button>
        {error && <p className="text-[#f26b1e] text-sm">{error}</p>} {/* Optionally display login error */}
      </form>
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold text-white italic drop-shadow-2xl">Register new account</h1>
      <section className="flex-1">
        <RegisterComponent />
      </section>
    </main>
  );
}
