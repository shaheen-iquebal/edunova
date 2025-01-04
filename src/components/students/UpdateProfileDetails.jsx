import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import { Link } from "react-router-dom";

const UpdateProfileDetails = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Update Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic Information</h3>

              {/* Read-only fields */}
              <div className="grid grid-cols-6 gap-4">
                <div className="space-y-2">
                  <Label>Roll Number</Label>
                  <Input
                    value={studentProfile.basicInfo.rollNumber}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Class & Section</Label>
                  <Input
                    value={`${studentProfile.basicInfo.class} - ${studentProfile.basicInfo.section}`}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Admission Date</Label>
                  <Input
                    type="date"
                    value={studentProfile.basicInfo.admissionDate}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              {/* Editable fields */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    defaultValue={studentProfile.basicInfo.fullName}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    defaultValue={studentProfile.basicInfo.dateOfBirth}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Input
                    id="gender"
                    defaultValue={studentProfile.basicInfo.gender}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Contact Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    defaultValue={studentProfile.contactInfo.address}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    defaultValue={studentProfile.contactInfo.phoneNumber}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={studentProfile.contactInfo.email}
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Emergency Contact</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyName">Name</Label>
                  <Input
                    id="emergencyName"
                    defaultValue={
                      studentProfile.contactInfo.emergencyContact.name
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyRelationship">Relationship</Label>
                  <Input
                    id="emergencyRelationship"
                    defaultValue={
                      studentProfile.contactInfo.emergencyContact.relationship
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyPhone">Phone Number</Label>
                  <Input
                    id="emergencyPhone"
                    defaultValue={
                      studentProfile.contactInfo.emergencyContact.phoneNumber
                    }
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Link
                to="/student/profile" // Replace with the actual route you want to navigate to
                className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700"
              >
                <Save className="w-4 h-4" />
                Profile Details
              </Link>
              <Button
                type="submit"
                className="flex items-center gap-2 bg-emerald-500"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <br></br>
    </div>
  );
};

export default UpdateProfileDetails;
