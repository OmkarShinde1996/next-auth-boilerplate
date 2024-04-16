import React from 'react'
import FormPage from './form';

const page = () => {
    return (
        <main className="h-screen flex items-center justify-center">
            <div className="flex h-full justify-center items-center w-full md:w-1/2">
                <FormPage />
            </div>
        </main>
    );
}

export default page