import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DollarSign,
  Bus,
  Stethoscope,
  CalendarCheck,
  AlertCircle,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StudentAdminInfo = () => {
  const data = {
    feesInfo: {
      feeStatus: "Paid",
      lastPaymentDate: "2024-03-01",
      outstandingDues: 0,
      feeBreakdown: {
        tuition: 5000,
        sports: 200,
        otherFees: 300,
      },
    },
    transportationDetails: {
      busRoute: "Route 12",
      driverName: "Mike Johnson",
      contactNumber: "+1-555-6789",
    },
    medicalHistory: {
      allergies: ["Peanuts"],
      specialNeeds: null,
    },
  };

  const totalFees = Object.values(data.feesInfo.feeBreakdown).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <div className="grid grid-cols-3 gap-6 mt-6">
      {/* Fees Information Card */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-2">
          <DollarSign className="w-5 h-5 text-green-500" />
          <CardTitle className="!mt-0">Fees Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge
              variant={
                data.feesInfo.feeStatus === "Paid" ? "success" : "destructive"
              }
            >
              {data.feesInfo.feeStatus}
            </Badge>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <CalendarCheck className="w-4 h-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Last Payment</p>
            </div>
            <p>
              {new Date(data.feesInfo.lastPaymentDate).toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground">
              Fee Breakdown
            </p>
            <div className="space-y-1">
              {Object.entries(data.feesInfo.feeBreakdown).map(
                ([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="capitalize">{key}</span>
                    <span>${value}</span>
                  </div>
                )
              )}
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span>Total</span>
                <span>${totalFees}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transportation Details Card */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-2">
          <Bus className="w-5 h-5 text-blue-500" />
          <CardTitle className="!mt-0">Transportation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-1">
              Bus Route
            </p>
            <p className="text-2xl font-bold">
              {data.transportationDetails.busRoute}
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">
              Driver Details
            </p>
            <p className="mb-1">{data.transportationDetails.driverName}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>{data.transportationDetails.contactNumber}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical History Card */}
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center space-x-2">
          <Stethoscope className="w-5 h-5 text-red-500" />
          <CardTitle className="!mt-0">Medical History</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-muted-foreground mb-2">
              Allergies
            </p>
            <div className="flex flex-wrap gap-2">
              {data.medicalHistory.allergies.map((allergy) => (
                <Badge key={allergy} variant="destructive">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>

          {data.medicalHistory.specialNeeds === null && (
            <div className="flex items-center gap-2 text-green-600">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">No special needs reported</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentAdminInfo;
