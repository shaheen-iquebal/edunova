import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Contact,
  Headset,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    basicInfo: {
      fullName: "Dr. Newton Sheikh",
      employeeId: "EMP2023567",
      dateOfBirth: "1985-08-23",
      gender: "Male",
      joinDate: "2018-07-01",
      designation: "Senior Mathematics Teacher",
      department: "Mathematics",
      qualification: "Ph.D. in Mathematics",
      specialization: "Advanced Calculus",
      yearsOfExperience: 12,
    },
    contactInfo: {
      address: "456 Oak Avenue, Springfield",
      phoneNumber: "+1-555-9876",
      email: "newton.sheikh@school.edu",
      emergencyContact: {
        name: "Michael Wilson",
        relationship: "Cousin",
        phoneNumber: "+1-555-8765",
      },
    },
  });

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleEmergencyContactChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        emergencyContact: {
          ...prev.contactInfo.emergencyContact,
          [field]: value,
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the update logic here
    console.log("Updated data:", formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Update Profile</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {/* Basic Info */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Contact className="w-4 h-4 text-sky-600" />
              <p className="text-sm font-semibold text-muted-foreground">
                Basic Information
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">
                  Full Name
                </label>
                <Input
                  value={formData.basicInfo.fullName}
                  onChange={(e) =>
                    handleInputChange("basicInfo", "fullName", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Date of Birth
                </label>
                <Input
                  type="date"
                  value={formData.basicInfo.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange(
                      "basicInfo",
                      "dateOfBirth",
                      e.target.value
                    )
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Gender</label>
                <Input
                  value={formData.basicInfo.gender}
                  onChange={(e) =>
                    handleInputChange("basicInfo", "gender", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Professional Info */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-4 h-4 text-purple-600" />
              <p className="text-sm font-semibold text-muted-foreground">
                Professional Information
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">
                  Designation
                </label>
                <Input
                  value={formData.basicInfo.designation}
                  onChange={(e) =>
                    handleInputChange(
                      "basicInfo",
                      "designation",
                      e.target.value
                    )
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Department
                </label>
                <Input
                  value={formData.basicInfo.department}
                  onChange={(e) =>
                    handleInputChange("basicInfo", "department", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Join Date
                </label>
                <Input
                  type="date"
                  value={formData.basicInfo.joinDate}
                  onChange={(e) =>
                    handleInputChange("basicInfo", "joinDate", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Headset className="w-4 h-4 text-emerald-500" />
              <p className="text-sm font-semibold text-muted-foreground">
                Contact Information
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Address</label>
                <Input
                  value={formData.contactInfo.address}
                  onChange={(e) =>
                    handleInputChange("contactInfo", "address", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Phone Number
                </label>
                <Input
                  value={formData.contactInfo.phoneNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "contactInfo",
                      "phoneNumber",
                      e.target.value
                    )
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <Input
                  type="email"
                  value={formData.contactInfo.email}
                  onChange={(e) =>
                    handleInputChange("contactInfo", "email", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-rose-500" />
              <p className="text-sm font-semibold text-muted-foreground">
                Emergency Contact
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Name</label>
                <Input
                  value={formData.contactInfo.emergencyContact.name}
                  onChange={(e) =>
                    handleEmergencyContactChange("name", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Relationship
                </label>
                <Input
                  value={formData.contactInfo.emergencyContact.relationship}
                  onChange={(e) =>
                    handleEmergencyContactChange("relationship", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">
                  Phone Number
                </label>
                <Input
                  value={formData.contactInfo.emergencyContact.phoneNumber}
                  onChange={(e) =>
                    handleEmergencyContactChange("phoneNumber", e.target.value)
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="w-32">
              Update Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default UpdateProfile;
