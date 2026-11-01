'use client';

import React, { useState, useEffect } from 'react';
import { User, Save, Plus, Trash2, Edit, SaveIcon } from 'lucide-react';
import { CVData, Experience, Education } from '@/types';
import { getProfileFromDB, saveProfileToDB } from '@/services/profileServices/personalInfo';
import { saveExperienceToDB, getExperienceFromDB, deleteExperienceFromDB, updateExperienceFromDB } from '@/services/profileServices/experience'
import { details } from 'framer-motion/client';

interface ProfileEditorProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
  showToast: (msg: string) => void;
  isDarkMode: boolean;
}

export default function ProfileEditor({ cvData, setCvData, showToast, isDarkMode }: ProfileEditorProps) {
  const [newRole, setNewRole] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newPeriod, setNewPeriod] = useState('');
  const [newDetails, setNewDetails] = useState('');
  const [experienceID, setexperienceID] = useState<string | null>(null)

  // Temporary state for new education form
  const [newDegree, setNewDegree] = useState('');
  const [newSchool, setNewSchool] = useState('');
  const [newEduPeriod, setNewEduPeriod] = useState('');

  // Auto-fetch profile data on mount using the service layer
  useEffect(() => {
    async function loadData() {
      try {

        const profile = await getProfileFromDB();
        if (profile) {
          setCvData((prev) => ({
            ...prev,
            fullName: profile.full_name || prev.fullName,
            title: profile.job_title || prev.title,
            email: profile.email || prev.email,
            phone: profile.phone || prev.phone,
            summary: profile.bio || prev.summary,
            githubUrl: profile.github_url,
            linkedinUrl: profile.linkedin_url,
          }));
        }

        const dbexperience = await getExperienceFromDB()
        if (dbexperience) {
          setCvData((prev) => ({
            ...prev,
            experience: dbexperience
          }));
        }

      } catch (err: any) {
        console.error("Error fetching profile:", err.message);
      }
    }

    loadData();
  }, [setCvData]);

  // Handle saving profile changes to Supabase
  const handleSaveProfile = async () => {
    try {
      await saveProfileToDB(cvData);
      localStorage.setItem('app_cv', JSON.stringify(cvData));
      showToast("Profile & Socials saved successfully!");
    } catch (err: any) {
      console.error("Supabase Save Error:", err);
      showToast("Error saving to Supabase: " + err.message);
    }
  };

  const handleAddExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRole.trim() || !newCompany.trim()) return;

    const newExp: Experience = {
      role: newRole,
      company: newCompany,
      period: newPeriod,
      details: newDetails
    };

    try {
      await saveExperienceToDB(newExp)

      const updatedList = await getExperienceFromDB();
      setCvData({
        ...cvData,
        experience: updatedList || [newExp, ...cvData.experience]
      });

      setNewRole('');
      setNewCompany('');
      setNewPeriod('');
      setNewDetails('');
      showToast("Experience saved successfully")
    } catch (error) {
      console.error(`Error saving experience: ${error}`)
      showToast(`Error saving experience: ${error}`)
    }
  };

  const handleDeleteExperience = async (id?: string) => {
    if (!id) return
    try {
      await deleteExperienceFromDB(id)

      const updatedExperience = cvData.experience.filter((exp) => exp.id !== id)

      setCvData({ ...cvData, experience: updatedExperience })
      showToast("Experience deleted successfully")
    } catch (error: any) {
      console.error(`Error deleting experience: ${error}`)
      showToast(`Error deleting experience: ${error}`)
    }
  }

  const handleEdit = (exp: Experience) => {
    if (!exp.id) return
    setexperienceID(exp.id)
    setNewRole(exp.role)
    setNewCompany(exp.company)
    setNewPeriod(exp.period)
    setNewDetails(exp.details)
  }

  const handleUpdateExperience = async (e: React.FormEvent) => {
    e.preventDefault()
    if(!experienceID) return
    try {
      const updatedData = {
        role: newRole,
        company: newCompany,
        period: newPeriod,
        details: newDetails,
      }

      await updateExperienceFromDB(updatedData, experienceID)
      const dbexperience = await getExperienceFromDB();
      if (dbexperience) {

        setCvData((prev) => ({
          ...prev,
          experience: dbexperience,
        }));

      }

        setexperienceID('')
    setNewRole('')
    setNewCompany('')
    setNewPeriod('')
    setNewDetails('')
    showToast("Experience Successfully Updated")

    } catch (error: any) {
      console.error('Error updating experience:', error)
      showToast(`Error updating experience: ${error}`)
    }
  }

  const handleCancelEdit = () => {
    setexperienceID('')
    setNewRole('')
    setNewCompany('')
    setNewPeriod('')
    setNewDetails('')
  }

  const handleAddEducation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDegree.trim() || !newSchool.trim()) return;

    const newEdu: Education = {
      degree: newDegree,
      school: newSchool,
      period: newEduPeriod
    };

    setCvData({
      ...cvData,
      education: [newEdu, ...cvData.education]
    });

    setNewDegree('');
    setNewSchool('');
    setNewEduPeriod('');
  };

  const handleDeleteEducation = (index: number) => {
    const updatedEdu = cvData.education.filter((_, i) => i !== index);
    setCvData({ ...cvData, education: updatedEdu });
  };

  return (
    <section className="space-y-8">
      <h2 className="text-xl font-bold flex items-center gap-2">
        <User className="text-[#59B292]" /> Profile & Curriculum Vitae Editor
      </h2>

      {/* BASIC INFO CARD */}
      <div className={`p-6 rounded-2xl border space-y-4 ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-gray-50 border-gray-200'}`}>
        <h3 className="font-bold text-sm text-[#59B292] uppercase">Basic Information & Socials</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">Full Name</label>
            <input type="text" value={cvData.fullName} onChange={(e) => setCvData({ ...cvData, fullName: e.target.value })} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">Job Title</label>
            <input type="text" value={cvData.title} onChange={(e) => setCvData({ ...cvData, title: e.target.value })} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">Email</label>
            <input type="text" value={cvData.email} onChange={(e) => setCvData({ ...cvData, email: e.target.value })} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">Phone</label>
            <input type="text" value={cvData.phone} onChange={(e) => setCvData({ ...cvData, phone: e.target.value })} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">GitHub URL</label>
            <input type="text" placeholder="https://github.com/username" value={cvData.githubUrl || ''} onChange={(e) => setCvData({ ...cvData, githubUrl: e.target.value })} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-400 block mb-1">LinkedIn URL</label>
            <input type="text" placeholder="https://linkedin.com/in/username" value={cvData.linkedinUrl || ''} onChange={(e) => setCvData({ ...cvData, linkedinUrl: e.target.value })} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-400 block mb-1">Professional Summary / Bio</label>
          <textarea rows={4} value={cvData.summary} onChange={(e) => setCvData({ ...cvData, summary: e.target.value })} className={`w-full px-4 py-2 rounded-xl border text-sm outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
        </div>

        <button onClick={handleSaveProfile} className="px-6 py-2.5 rounded-xl bg-[#59B292] text-black font-bold text-xs flex items-center gap-2 hover:opacity-90 transition shadow-lg shadow-[#59B292]/10">
          <Save className="w-4 h-4" /> Save Profile Changes
        </button>
      </div>

      {/* EXPERIENCE MANAGER */}
      <div className={`p-6 rounded-2xl border space-y-6 ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-gray-50 border-gray-200'}`}>
        <h3 className="font-bold text-sm text-[#59B292] uppercase">Work Experience Manager</h3>

        {/* Add Experience Form */}
        <div className="space-y-3 p-4 rounded-xl border border-dashed border-[#59B292]/40 bg-[#59B292]/5">
          <p className="text-xs font-bold">Add New Experience Entry</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" placeholder="Role / Title (e.g. Frontend Developer)" value={newRole} onChange={(e) => setNewRole(e.target.value)} className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
            <input type="text" placeholder="Company (e.g. TechCorp)" value={newCompany} onChange={(e) => setNewCompany(e.target.value)} className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
            <input type="text" placeholder="Period (e.g. 2023 - Present)" value={newPeriod} onChange={(e) => setNewPeriod(e.target.value)} className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>
          <textarea rows={2} placeholder="Key achievements / details" value={newDetails} onChange={(e) => setNewDetails(e.target.value)} className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
          {!experienceID ? (
            <button onClick={handleAddExperience} className="px-4 py-2 rounded-lg bg-[#59B292] text-black font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition">
              <Plus className="w-3.5 h-3.5" /> Add Experience
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={handleUpdateExperience} className="px-4 py-2 rounded-lg bg-[#59B292] text-black font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition">
                <SaveIcon className="w-3.5 h-3.5" /> Update
              </button>
              <button onClick={handleCancelEdit} className="px-4 py-2 rounded-lg bg-gray-600 text-white font-bold text-xs hover:opacity-90 transition">
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* List of Experiences */}
        <div className="space-y-3">
          {cvData.experience.map((exp, index) => (
            <div key={index} className={`p-4 rounded-xl border flex justify-between items-start gap-4 ${isDarkMode ? 'bg-black border-[#222222]' : 'bg-white border-gray-200'}`}>
              <div>
                <p className="font-bold text-sm">{exp.role} — <span className="text-[#59B292]">{exp.company}</span></p>
                <span className="text-xs text-gray-400 font-mono">{exp.period}</span>
                <p className="text-xs mt-1 text-gray-300">{exp.details}</p>
              </div>
              <div className='flex flex-row'>
                <button onClick={() => handleDeleteExperience(exp.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
                <button onClick={() => handleEdit(exp)} className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition shrink-0">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDUCATION MANAGER */}
      <div className={`p-6 rounded-2xl border space-y-6 ${isDarkMode ? 'bg-[#121212] border-[#222222]' : 'bg-gray-50 border-gray-200'}`}>
        <h3 className="font-bold text-sm text-[#59B292] uppercase">Education Manager</h3>

        {/* Add Education Form */}
        <div className="space-y-3 p-4 rounded-xl border border-dashed border-[#59B292]/40 bg-[#59B292]/5">
          <p className="text-xs font-bold">Add New Education Entry</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input type="text" placeholder="Degree (e.g. B.S. Computer Science)" value={newDegree} onChange={(e) => setNewDegree(e.target.value)} className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
            <input type="text" placeholder="School / University" value={newSchool} onChange={(e) => setNewSchool(e.target.value)} className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
            <input type="text" placeholder="Period (e.g. 2017 - 2021)" value={newEduPeriod} onChange={(e) => setNewEduPeriod(e.target.value)} className={`w-full px-3 py-2 rounded-lg border text-xs outline-none ${isDarkMode ? 'bg-black border-[#222222] text-white' : 'bg-white border-gray-300 text-black'}`} />
          </div>
          <button onClick={handleAddEducation} className="px-4 py-2 rounded-lg bg-[#59B292] text-black font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition">
            <Plus className="w-3.5 h-3.5" /> Add Education
          </button>
        </div>

        {/* List of Educations */}
        <div className="space-y-3">
          {cvData.education.map((edu, index) => (
            <div key={index} className={`p-4 rounded-xl border flex justify-between items-center ${isDarkMode ? 'bg-black border-[#222222]' : 'bg-white border-gray-200'}`}>
              <div>
                <p className="font-bold text-sm">{edu.degree}</p>
                <p className="text-xs text-gray-400">{edu.school} <span className="text-[#59B292] font-mono">({edu.period})</span></p>
              </div>
              <button onClick={() => handleDeleteEducation(index)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition shrink-0">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}