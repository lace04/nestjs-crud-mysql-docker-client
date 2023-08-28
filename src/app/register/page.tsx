'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RegisterPage = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const responseAPI = await res.json();

    if (!res.ok) {
      setErrors(responseAPI.message);
      return;
    }

    const responseNextAuth = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setErrors(responseNextAuth.error.split(','));
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='name'
          name='name'
          className='form-control mb-2'
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          type='email'
          placeholder='example@mail.com'
          name='email'
          className='form-control mb-2'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type='password'
          placeholder='******'
          name='password'
          className='form-control mb-2'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type='submit' className='btn btn-primary'>
          Register
        </button>
      </form>

      {errors.length > 0 && (
        <div className='alert alert-danger mt-2'>
          <ul className='mb-0'>
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default RegisterPage;
