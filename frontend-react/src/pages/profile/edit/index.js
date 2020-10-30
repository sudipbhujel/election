import React from "react";

import ProfileEditForm from "./ProfileEditForm";

export default function ProfileEdit({ profile, editProfile }) {
  return <ProfileEditForm profile={profile} editProfile={editProfile} />;
}
