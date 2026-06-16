import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });
  const [formValues, setFormValues] = useState(profile);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const getStoredUser = () => {
    try {
      return JSON.parse(localStorage.getItem("userInfo") || "null");
    } catch {
      return null;
    }
  };

  const syncLocalUser = (user) => {
    if (!user) return;
    localStorage.setItem("userInfo", JSON.stringify(user));
  };

  const loadFallbackProfile = () => {
    const stored = getStoredUser();
    if (stored) {
      setProfile(stored);
      setFormValues({
        name: stored.name || "",
        lastName: stored.lastName || "",
        email: stored.email || "",
        phone: stored.phone || "",
        address: stored.address || "",
      });
      setAvatarPreview(stored.avatar || "");
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://cosmetic-backend-e6ia.onrender.com/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const user = res.data;
        setProfile(user);
        setFormValues({
          name: user.name || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          address: user.address || "",
        });
        setAvatarPreview(user.avatar || "");
        syncLocalUser(user);
      } catch (error) {
        loadFallbackProfile();
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    if (!avatarFile) return;
    const previewUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [avatarFile]);

  const handleChange = (field) => (event) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!formValues.name.trim() || !formValues.lastName.trim()) {
      toast.error("First name and last name are required");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const data = new FormData();
      data.append("name", formValues.name.trim());
      data.append("lastName", formValues.lastName.trim());
      data.append("phone", formValues.phone.trim());
      data.append("address", formValues.address.trim());
      if (avatarFile) {
        data.append("avatar", avatarFile);
      }

      const res = await axios.put(
        "https://cosmetic-backend-e6ia.onrender.com/update-profile",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      const updatedUser = res.data.user ||
        res.data.data || {
          ...profile,
          ...formValues,
        };
      setProfile(updatedUser);
      setFormValues({
        name: updatedUser.name || "",
        lastName: updatedUser.lastName || "",
        email: updatedUser.email || "",
        phone: updatedUser.phone || "",
        address: updatedUser.address || "",
      });
      setAvatarPreview(updatedUser.avatar || avatarPreview);
      syncLocalUser(updatedUser);
      toast.success("Profile updated successfully");
    } catch (error) {
      if (error.response?.status === 404 || error.response?.status === 500) {
        const fallbackUser = {
          ...profile,
          ...formValues,
          avatar: avatarPreview,
        };
        setProfile(fallbackUser);
        syncLocalUser(fallbackUser);
        toast.success("Profile saved locally; backend endpoint unavailable");
      } else {
        toast.error(error.response?.data?.message || "Could not save profile");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="p-6 bg-gray-50 dark:bg-black dark:text-white min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Update your name, avatar, phone, and address.
          </p>
        </div>

        {loading ? (
          <div className="rounded-xl bg-white dark:bg-zinc-900 p-6 shadow-sm">
            <p>Loading profile...</p>
          </div>
        ) : (
          <Card className="bg-white text-black dark:bg-zinc-900 dark:text-white">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      First Name
                    </label>
                    <Input
                      value={formValues.name}
                      onChange={handleChange("name")}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">
                      Last Name
                    </label>
                    <Input
                      value={formValues.lastName}
                      onChange={handleChange("lastName")}
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Email</label>
                    <Input value={formValues.email} disabled />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Phone</label>
                    <Input
                      value={formValues.phone}
                      onChange={handleChange("phone")}
                      placeholder="Phone"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium">Address</label>
                  <Textarea
                    value={formValues.address}
                    onChange={handleChange("address")}
                    placeholder="Address"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2 items-center">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Avatar</label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(event) => {
                        setAvatarFile(event.target.files?.[0] || null);
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar preview"
                        className="h-24 w-24 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                        No image
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="submit"
                    className="bg-black text-white"
                    disabled={saving}>
                    {saving ? "Saving..." : "Save Profile"}
                  </Button>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Changes are saved locally if the backend endpoint is
                    unavailable.
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
      <Toaster position="top-right" />
    </main>
  );
};

export default Profile;
