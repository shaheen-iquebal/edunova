import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Contact, Headset, Hospital } from "lucide-react";
import { Link } from "react-router-dom";

const StudentProfileCard = () => {
  const studentProfile = {
    basicInfo: {
      fullName: "John Doe",
      rollNumber: "2023012345",
      dateOfBirth: "2007-05-15",
      gender: "Male",
      class: "10",
      section: "A",
      admissionDate: "2020-06-15",
    },
    contactInfo: {
      address: "123 Elm Street, Springfield",
      phoneNumber: "+1-555-1234",
      email: "john.doe@example.com",
      emergencyContact: {
        name: "Jane Doe",
        relationship: "Mother",
        phoneNumber: "+1-555-5678",
      },
    },
  };

  return (
    <Card className="msax-w-4xl shadow-lg">
      <CardContent className="p-6">
        <div className="flex gap-6">
          {/* Left section - Image and buttons */}
          <div className="flex flex-col gap-4 w-64">
            <div className="aspect-[4/5] bg-muted relative overflow-hidden rounded-md">
              <img
                src="/public/student/profile/shaheen.jpg"
                alt="Student profile"
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

          {/* Right section - Student info */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-2xl font-semibold">
                {studentProfile.basicInfo.fullName}
              </h3>
              <Link
                to="/student/update-profile" // Replace with the appropriate link for updating the profile
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
                  <p className="text-sm text-muted-foreground">Roll Number</p>
                  <p>{studentProfile.basicInfo.rollNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Class & Section
                  </p>
                  <p>
                    {studentProfile.basicInfo.class} -{" "}
                    {studentProfile.basicInfo.section}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p>
                    {new Date(
                      studentProfile.basicInfo.dateOfBirth
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p>{studentProfile.basicInfo.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Admission Date
                  </p>
                  <p>
                    {new Date(
                      studentProfile.basicInfo.admissionDate
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

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
                  <p>{studentProfile.contactInfo.address}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p>{studentProfile.contactInfo.phoneNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{studentProfile.contactInfo.email}</p>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center gap-2 mb-2 mt-2">
                    <Hospital className="w-4 h-4 text-rose-500" />
                    <p className="text-sm font-semibold text-muted-foreground">
                      Emergency Contact
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Name</p>
                      <p>{studentProfile.contactInfo.emergencyContact.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Relationship
                      </p>
                      <p>
                        {
                          studentProfile.contactInfo.emergencyContact
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
                          studentProfile.contactInfo.emergencyContact
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

export default StudentProfileCard;
