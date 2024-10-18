"use client";
import { DashboardSidebar } from "@/components";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fileUpload } from "@/utils/fileUpload";

interface DashboardSettingsPageProps {
  params: {
    userId: string;
  };
}

const DashboardSettingsPage = ({ params: { userId } }: DashboardSettingsPageProps) => {
  const [settings, setSettings] = useState<Settings>()

  const getSettings = async () => {
    if (userId) {
      await fetch(`http://localhost:3001/api/settings/${userId}`, {
        method: "GET",
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          setSettings(data);
        });
    }
  }

  useEffect(() => {
    getSettings()
  }, [userId])

  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto h-full max-xl:flex-col max-xl:h-fit">
      <DashboardSidebar />
      <div className="flex flex-col gap-y-7 xl:ml-5 w-full max-xl:px-5">

        {/* Logo */}
        <div>
          <input
            type="file"
            className="file-input file-input-bordered file-input-lg w-full max-w-sm"
            name="logo.webp"
            onChange={(e) => {
              const selectedFile = e.target.files ? e.target.files[0] : null;

              if (selectedFile) {
                fileUpload(selectedFile);
                setSettings({ ...settings!, logo: selectedFile.name });
              }
            }}
          />
          {settings?.logo && (
            <Image
              src={`/` + settings?.logo}
              alt="logo"
              className="w-auto h-auto mt-2"
              width={100}
              height={100}
            />
          )}
        </div>

        {/* Main Color */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Main color:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={settings?.mainColor}
              onChange={(e) =>
                setSettings({ ...settings!, mainColor: e.target.value })
              }
            />
          </label>
        </div>

        {/* Secondary Color */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Secondary color:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={settings?.secondaryColor}
              onChange={(e) =>
                setSettings({ ...settings!, secondaryColor: e.target.value })
              }
            />
          </label>
        </div>

        {/* Language */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Language</span>
            </div>
            <select
              className="select select-bordered"
              value={settings?.language}
              onChange={(e) => {
                setSettings({ ...settings!, language: e.target.value });
              }}
            >
              <option value="en">en</option>
              <option value="es">es</option>
            </select>
          </label>
        </div>

        {/* Theme */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Theme</span>
            </div>
            <select
              className="select select-bordered"
              value={settings?.theme}
              onChange={(e) => {
                setSettings({ ...settings!, theme: e.target.value });
              }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </div>

        {/* Company phone */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Company phone:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={settings?.companyPhone}
              onChange={(e) =>
                setSettings({ ...settings!, companyPhone: e.target.value })
              }
            />
          </label>
        </div>

        {/* Company email */}
        <div>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Company email:</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full max-w-xs"
              value={settings?.companyEmail}
              onChange={(e) =>
                setSettings({ ...settings!, companyEmail: e.target.value })
              }
            />
          </label>
        </div>

      </div>
    </div>
  );
};

export default DashboardSettingsPage;
