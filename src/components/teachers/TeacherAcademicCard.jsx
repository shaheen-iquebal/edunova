import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, BookOpen, Globe, Calendar } from "lucide-react";
import { GrCertificate } from "react-icons/gr";

const TeacherAcademicCard = () => {
  const academicInfo = {
    education: [
      {
        degree: "Ph.D. in Mathematics",
        institution: "Stanford University",
        year: "2015",
        specialization: "Advanced Calculus",
        thesis: "Applications of Complex Analysis in Number Theory",
        cgpa: "3.9/4.0",
        honors: "Summa Cum Laude",
      },
      {
        degree: "M.Sc. in Mathematics",
        institution: "MIT",
        year: "2011",
        specialization: "Pure Mathematics",
        thesis: "Elliptic Curves and Cryptography",
        cgpa: "3.85/4.0",
        honors: "Department Honor Roll",
      },
      {
        degree: "B.Sc. in Mathematics",
        institution: "UCLA",
        year: "2009",
        specialization: "Mathematics and Physics",
        cgpa: "3.92/4.0",
        honors: "Dean's List",
      },
    ],
    certifications: [
      {
        name: "Advanced Mathematics Teaching Certification",
        issuingBody: "National Board of Teaching Standards",
        year: "2016",
        validUntil: "2026",
        credentialId: "NBTS-2016-78945",
      },
      {
        name: "Digital Mathematics Education Specialist",
        issuingBody: "EdTech International",
        year: "2018",
        validUntil: "2024",
        credentialId: "ETI-2018-12345",
      },
    ],
    publications: [
      {
        title: "Modern Approaches to Teaching Calculus",
        journal: "Mathematics Education Review",
        year: "2019",
        type: "Research Paper",
        doi: "10.1234/mer.2019.123",
      },
      {
        title: "Integration of Technology in Mathematics Classrooms",
        journal: "Digital Education Quarterly",
        year: "2020",
        type: "Case Study",
        doi: "10.1234/deq.2020.456",
      },
    ],
    languages: [
      { language: "English", proficiency: "Native" },
      { language: "Spanish", proficiency: "Professional Working" },
      { language: "French", proficiency: "Elementary" },
    ],
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-purple-600" />
          <h3 className="text-2xl font-semibold">Academic Background</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Education Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-sky-600" />
            <h4 className="text-lg font-semibold">Education</h4>
          </div>
          <div className="space-y-4">
            {academicInfo.education.map((edu, index) => (
              <div key={index} className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold text-lg">{edu.degree}</h5>
                  <span className="text-sm text-muted-foreground">
                    {edu.year}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Institution</p>
                    <p>{edu.institution}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Specialization
                    </p>
                    <p>{edu.specialization}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">CGPA</p>
                    <p>{edu.cgpa}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Honors</p>
                    <p>{edu.honors}</p>
                  </div>
                  {edu.thesis && (
                    <div className="col-span-2">
                      <p className="text-sm text-muted-foreground">Thesis</p>
                      <p>{edu.thesis}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <GrCertificate className="h-5 w-5 text-emerald-600" />
            <h4 className="text-lg font-semibold">
              Professional Certifications
            </h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {academicInfo.certifications.map((cert, index) => (
              <div key={index} className="bg-muted/50 p-4 rounded-lg">
                <h5 className="font-semibold mb-2">{cert.name}</h5>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Issuing Body
                    </p>
                    <p>{cert.issuingBody}</p>
                  </div>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Issue Year
                      </p>
                      <p>{cert.year}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Valid Until
                      </p>
                      <p>{cert.validUntil}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Credential ID
                    </p>
                    <p className="font-mono text-sm">{cert.credentialId}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publications Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-amber-600" />
            <h4 className="text-lg font-semibold">Publications</h4>
          </div>
          <div className="space-y-3">
            {academicInfo.publications.map((pub, index) => (
              <div key={index} className="bg-muted/50 p-4 rounded-lg">
                <h5 className="font-semibold">{pub.title}</h5>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Journal</p>
                    <p>{pub.journal}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p>{pub.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">DOI</p>
                    <p className="font-mono text-sm">{pub.doi}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Languages Section */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-indigo-600" />
            <h4 className="text-lg font-semibold">Language Proficiency</h4>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {academicInfo.languages.map((lang, index) => (
              <div key={index} className="bg-muted/50 p-3 rounded-lg">
                <p className="font-medium">{lang.language}</p>
                <p className="text-sm text-muted-foreground">
                  {lang.proficiency}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherAcademicCard;
