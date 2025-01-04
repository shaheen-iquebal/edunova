import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Pencil,
  Trash2,
  Contact,
  Headset,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";

const TeacherProfileCard = () => {
  const teacherProfile = {
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
  };

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6">
        <div className="flex gap-6">
          {/* Left section - Image and buttons */}
          <div className="flex flex-col gap-4 w-64">
            <div className="aspect-[4/5] bg-muted relative overflow-hidden rounded-md">
              <img
                src="/public/teacher/profile/newton.jpg"
                alt="Teacher profile"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2"
              >
                <Pencil className="h-4 w-4" />
                Update
              </Button>
              <Button
                variant="outline"
                className="flex-1 flex items-center justify-center gap-2 text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                Remove
              </Button>
            </div>
          </div>

          {/* Right section - Teacher info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-semibold">
                {teacherProfile.basicInfo.fullName}
              </h3>
              <Link
                to="/admin/update-profile"
                className="text-sm text-sky-600 hover:underline font-semibold italic"
              >
                Update Profile Details →
              </Link>
            </div>

            {/* Basic Info */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Contact className="w-4 h-4 text-sky-600" />
                <p className="text-sm font-semibold text-muted-foreground">
                  Basic Information
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Employee ID</p>
                  <p>{teacherProfile.basicInfo.employeeId}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p>
                    {new Date(
                      teacherProfile.basicInfo.dateOfBirth
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p>{teacherProfile.basicInfo.gender}</p>
                </div>
              </div>
            </div>

            {/* Professional Info */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-4 h-4 text-purple-600" />
                <p className="text-sm font-semibold text-muted-foreground">
                  Professional Information
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Designation</p>
                  <p>{teacherProfile.basicInfo.designation}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p>{teacherProfile.basicInfo.department}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Join Date</p>
                  <p>
                    {new Date(
                      teacherProfile.basicInfo.joinDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Academic Info */}
            {/* <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <p className="text-sm font-semibold text-muted-foreground">
                  Academic Information
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Qualification</p>
                  <p>{teacherProfile.basicInfo.qualification}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Specialization
                  </p>
                  <p>{teacherProfile.basicInfo.specialization}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Experience</p>
                  <p>{teacherProfile.basicInfo.yearsOfExperience} years</p>
                </div>
              </div>
            </div> */}

            {/* Contact Info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Headset className="w-4 h-4 text-emerald-500" />
                <p className="text-sm font-semibold text-muted-foreground">
                  Contact Information
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p>{teacherProfile.contactInfo.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p>{teacherProfile.contactInfo.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{teacherProfile.contactInfo.email}</p>
                </div>
                <div className="col-span-3">
                  <div className="flex items-center gap-2 mb-2 mt-2">
                    <Award className="w-4 h-4 text-rose-500" />
                    <p className="text-sm font-semibold text-muted-foreground">
                      Emergency Contact
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p>{teacherProfile.contactInfo.emergencyContact.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Relationship
                      </p>
                      <p>
                        {
                          teacherProfile.contactInfo.emergencyContact
                            .relationship
                        }
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Phone Number
                      </p>
                      <p>
                        {
                          teacherProfile.contactInfo.emergencyContact
                            .phoneNumber
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherProfileCard;
