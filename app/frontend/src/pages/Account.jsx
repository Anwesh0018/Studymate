import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

export default function AccountPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [editing, setEditing] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpMsg, setOtpMsg] = useState("");
  const navigate = useNavigate('');

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");

    if (!refreshToken) return null;

    const res = await fetch("http://localhost:8000/auth/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (!res.ok) return null;

    const data = await res.json();
    localStorage.setItem("token", data.access_token);
    return data.access_token;
  };

  useEffect(() => {
    let token = localStorage.getItem("token");

    const fetchUser = async () => {
      try {
        let response = await fetch("http://localhost:8000/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if(response.status === 401) {
          token = await refreshAccessToken();
          if(!token) return;

          response = await fetch("http://localhost:8000/users/me", {
            headers: { Authorization: `Bearer ${token}` },
          });
        }

        if (response.ok) {
          const data = await response.json();
          setName(data.username || "");
          setEmail(data.email || "");
          setProfilePic(data.profile_pic || "");

          localStorage.setItem(
            "user",
            JSON.stringify({
              username: data.username,
              email: data.email,
              profilePic: data.profile_pic,
            })
          );
        } else {
          console.error("Failed to fetch user info");
        }
      } catch (err) {
        console.error("Error fetching user", err);
      }
    };

    if (token) {
      fetchUser();
    }
  }, []);

  const sendOtp = async () => {
    const res = await fetch("http://localhost:8000/users/send-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    if (data.success) {
      setOtpSent(true);
      setOtpMsg("OTP sent successfully.");
    } else {
      setOtpMsg("Failed to send OTP.");
    }
  };

  const verifyOtp = async () => {
    const res = await fetch("http://localhost:8000/users/verify-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, otp }),
    });
    const data = await res.json();
    if (data.valid) {
      setOtpVerified(true);
      setOtpMsg("✅ OTP Verified!");
    } else {
      setOtpMsg("❌ Invalid OTP.");
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      setProfilePic(base64Image);

      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:8000/users/update-profile-pic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ profile_pic: base64Image }),
        });

        if (response.ok) {
          const updatedUser = {
            name,
            email,
            profilePic: base64Image,
          };
          localStorage.setItem("user", JSON.stringify(updatedUser));
        } else {
          console.error("Failed to update image");
        }
      } catch (error) {
        console.error("Error uploading image", error);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedUser = {
      name,
      email,
      profilePic,
    };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-700 to-gray-800 text-white px-4">
      <h1 className="text-3xl mb-6 font-semibold">My Account</h1>

      {/* Profile Picture */}
      <div className="mb-6 text-center">
        {profilePic ? (
          <img
            src={profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover mx-auto"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-400 rounded-full mx-auto flex items-center justify-center">
            <span className="text-xl">👤</span>
          </div>
        )}

        {/* Custom Add Picture Button */}
        <div className="mt-2">
          <label
            htmlFor="fileUpload"
            className={`inline-block px-4 py-2 rounded bg-blue-600 text-white cursor-pointer 
                        ${!editing ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
          >
            Add Picture
          </label>
          <input
            id="fileUpload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={!editing}
            className="hidden"
          />
        </div>
      </div>

      {/* Name */}
      <div className="mb-4 w-full max-w-xs">
        <label className="block mb-1">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          readOnly={!editing}
          className={`w-full px-3 py-2 rounded ${
            editing ? "bg-white text-black" : "bg-gray-200 text-gray-600"
          }`}
        />
      </div>

      {/* Email */}
      <div className="mb-6 w-full max-w-xs">
        <label className="block mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={!editing}
          className={`w-full px-3 py-2 rounded ${
            editing ? "bg-white text-black" : "bg-gray-200 text-gray-600"
          }`}
        />
      </div>

      {/* Mobile Number Verification */}
      <div className="mb-6 w-full max-w-xs">
        <label className="block mb-1">Mobile Number</label>

        {otpVerified ? (
          // ✅ Show verified number (label style)
          <div className="px-3 py-2 rounded bg-gray-200 text-gray-700">
            ✅ Verified: {phone}
          </div>
        ) : (
          <>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full px-3 py-2 rounded bg-white text-black mb-2"
            />
            {!otpSent ? (
              <button
                onClick={sendOtp}
                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
              >
                Send OTP
              </button>
            ) : (
              <div className="mt-2">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full px-3 py-2 rounded bg-white text-black mb-2"
                />
                <button
                  onClick={verifyOtp}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded w-full"
                >
                  Verify OTP
                </button>
              </div>
            )}
          </>
        )}

        {otpMsg && (
          <p className="mt-2 text-sm text-center text-white">{otpMsg}</p>
        )}
      </div>


      {/* Buttons */}
      <div className="flex gap-4">
        {editing ? (
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded shadow"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded shadow"
          >
            Edit
          </button>
        )}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded shadow"
        >
          Logout
        </button>
        <button
            onClick={() => navigate("/")}
            className=" bg-green-700 hover:bg-green-800 px-4 py-2 "
        >
          🏠 Home
        </button>
      </div>
    </div>
  );
}