"use client";

import React, { useState, useEffect } from "react";
import UserProfile from "../../components/userProfile/UserProfile";
import { useSession } from "next-auth/react";
import { User } from "../../utils/types";

const UserProfilePage: React.FC = () => {
  const { data } = useSession();
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/v1/users/${data?.user?.id}`);
        if (!res.ok) {
          throw new Error(`An error occurred: ${res.status}`);
        }
        const userData: User = await res.json();
        setUserData(userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (data?.user?.id) {
      fetchUserData();
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return <UserProfile userData={userData} />;
};

export default UserProfilePage;
