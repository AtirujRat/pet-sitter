import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SitterManageProfile() {
  const router = useRouter();
  const { id } = router.query;

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch the profile data from your API
      fetch(`/api/sitters/${id}`)
        .then((response) => response.json())
        .then((data) => setProfile(data));
    }
  }, [id]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile of Sitter ID: {id}</h1>
      <p>Email: {profile.email}</p>
      <p>Full Name: {profile.fullname}</p>
      {/* Display other profile information */}
    </div>
  );
}
