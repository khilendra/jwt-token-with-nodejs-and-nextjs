// profile.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import { authHeader } from "../lib/helper";
import styles from '../styles/profile.module.css'; // Import CSS module

export default function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('No authorization token found');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5001/api/user', {
                    headers: authHeader()
                });

                if (response.status !== 200) {
                    throw new Error(`Failed to fetch profile: ${response.status}`);
                }

                setProfileData(response.data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return <p className={styles.error}>Error: {error}</p>;
    }

    if (!profileData) {
        return <p className={styles.loading}>Loading...</p>;
    }

    return (
        <div className={styles['profile-container']}>
            <h1>Hello {profileData.username}, Welcome to Dashboard</h1>
            {/* Example of displaying profile data */}
            {/* <p>Username: {profileData.username}</p>
            <p>Email: {profileData.email}</p> */}
            {/* Add more profile fields as needed */}
        </div>
    );
}
