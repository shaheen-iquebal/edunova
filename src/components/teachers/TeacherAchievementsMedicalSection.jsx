import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import {
  Trophy,
  Medal,
  Star,
  Award,
  Heart,
  Stethoscope,
  Pill,
  AlertTriangle,
  Activity,
} from "lucide-react";

const TeacherAchievementsMedicalSection = () => {
  const achievementsData = {
    schoolAwards: [
      {
        title: "Teacher of the Year",
        year: "2023",
        description:
          "Awarded for exceptional contribution to student development",
        category: "Excellence in Teaching",
      },
      {
        title: "Innovation in Education",
        year: "2022",
        description: "Developed new mathematics teaching methodology",
        category: "Innovation",
      },
    ],
    initiatives: [
      {
        name: "Math Club Mentor",
        period: "2021-Present",
        impact: "Led student team to state mathematics olympiad finals",
      },
      {
        name: "Digital Learning Program Lead",
        period: "2022-Present",
        impact: "Implemented hybrid learning solutions across grade levels",
      },
    ],
    recognitions: [
      {
        title: "Perfect Attendance",
        year: "2023",
        issuer: "School Administration",
      },
      {
        title: "Student Mentor Excellence",
        year: "2022",
        issuer: "Department of Education",
      },
    ],
    extracurricular: [
      {
        activity: "Chess Club Coordinator",
        achievements: "Regional inter-school championship winners",
        year: "2023",
      },
      {
        activity: "Science Fair Judge",
        achievements: "Organized annual district level competition",
        year: "2022-2023",
      },
    ],
  };

  const medicalData = {
    generalInfo: {
      bloodGroup: "O Positive",
      height: "175 cm",
      weight: "70 kg",
      emergencyContact: "+1-555-0123",
    },
    allergies: [
      {
        type: "Food",
        allergen: "Peanuts",
        severity: "Moderate",
        notes: "Avoid all nut products",
      },
      {
        type: "Environmental",
        allergen: "Pollen",
        severity: "Mild",
        notes: "Seasonal allergies during spring",
      },
    ],
    medicalConditions: [
      {
        condition: "Asthma",
        diagnosed: "2015",
        severity: "Mild",
        treatment: "Inhaler as needed",
      },
    ],
    medications: [
      {
        name: "Ventolin Inhaler",
        dosage: "As needed",
        purpose: "Asthma relief",
        notes: "Keep one in office",
      },
    ],
    vaccinations: [
      {
        name: "COVID-19",
        date: "2023-09-15",
        nextDue: "2024-09-15",
      },
      {
        name: "Flu Shot",
        date: "2023-10-01",
        nextDue: "2024-10-01",
      },
    ],
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Achievements Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trophy className="h-6 w-6 text-amber-600" />
            <h3 className="text-2xl font-semibold">Achievements</h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* School Awards */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Medal className="h-5 w-5 text-amber-500" />
              <h4 className="font-semibold">School Awards</h4>
            </div>
            <div className="space-y-3">
              {achievementsData.schoolAwards.map((award, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{award.title}</p>
                    <span className="text-sm text-muted-foreground">
                      {award.year}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {award.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Initiatives */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-5 w-5 text-blue-500" />
              <h4 className="font-semibold">Initiatives</h4>
            </div>
            <div className="space-y-3">
              {achievementsData.initiatives.map((initiative, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{initiative.name}</p>
                    <span className="text-sm text-muted-foreground">
                      {initiative.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {initiative.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Extracurricular */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-purple-500" />
              <h4 className="font-semibold">Extracurricular Activities</h4>
            </div>
            <div className="space-y-3">
              {achievementsData.extracurricular.map((activity, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <p className="font-medium">{activity.activity}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity.achievements}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activity.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Card */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-600" />
            <h3 className="text-2xl font-semibold">Medical Information</h3>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* General Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Stethoscope className="h-5 w-5 text-blue-500" />
              <h4 className="font-semibold">General Information</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="border rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Blood Group</p>
                <p className="font-medium">
                  {medicalData.generalInfo.bloodGroup}
                </p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Height</p>
                <p className="font-medium">{medicalData.generalInfo.height}</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="font-medium">{medicalData.generalInfo.weight}</p>
              </div>
              <div className="border rounded-lg p-3">
                <p className="text-sm text-muted-foreground">
                  Emergency Contact
                </p>
                <p className="font-medium">
                  {medicalData.generalInfo.emergencyContact}
                </p>
              </div>
            </div>
          </div>

          {/* Allergies */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <h4 className="font-semibold">Allergies</h4>
            </div>
            <div className="space-y-3">
              {medicalData.allergies.map((allergy, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{allergy.allergen}</p>
                    <span className="text-sm px-2 py-1 rounded-full bg-red-100 text-red-700">
                      {allergy.severity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {allergy.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Medications */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Pill className="h-5 w-5 text-green-500" />
              <h4 className="font-semibold">Medications</h4>
            </div>
            <div className="space-y-3">
              {medicalData.medications.map((medication, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <p className="font-medium">{medication.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Dosage: {medication.dosage}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {medication.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Vaccinations */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="h-5 w-5 text-emerald-500" />
              <h4 className="font-semibold">Vaccinations</h4>
            </div>
            <div className="space-y-3">
              {medicalData.vaccinations.map((vaccination, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <p className="font-medium">{vaccination.name}</p>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Date: {vaccination.date}</span>
                    <span>Next Due: {vaccination.nextDue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherAchievementsMedicalSection;
