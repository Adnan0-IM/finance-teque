import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import dubaiCityscape from "@/assets/business-banner@2x.jpg";
import { Linkedin, Twitter } from "lucide-react";
import { ImageWithFallback } from "@/components/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import { MotionButton } from "@/components/animations/MotionizedButton";
import PageTransition from "@/components/animations/PageTransition";
import { FadeIn } from "../components/animations/FadeIn";
import { MotionImage } from "../components/animations/MotionizedImage";
import { motion } from "framer-motion";
import { sectionVariant } from "@/utils/motionVariants";

export function TeamPage() {
  const [openModal, setOpenModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const boardMembers = [
    {
      id: 1,
      name: "Ibrahim Kabir Bayero",
      position: "Chairman, Board of Directors",
      imageUrl: "/team/board/ibrahim-bayero.jpeg",
      education: "B.Sc. Sociology, Usman Dan Fodio University, Sokoto",
      expertise: "Enterprise Risk Management, Customer Relations",
      bio: "A fellow from institute of corporate administration of Nigeria and specialist in Enterprise risk management. He was a career banker and a senior manager at Kano Electricity Distribution Company of Nigeria (KEDCO). Also a Consultant on capital market activities over the years. He is a chairman of Crystal partners' investment, an investment advisory company.",
      linkedin: "",
      twitter: "",
    },
    {
      id: 2,
      name: "Suleiman Abubakar",
      position: "Managing Director",
      imageUrl: "/team/board/suleiman-abubakar.jpeg",
      education:
        "B.Sc. Accountancy, Bayero University Kano | Master in Business and Commercial Law (M.B.C.L)",
      expertise: "Accountancy, Auditing, Advisory Services",
      bio: "Alhaji Suleiman Abubakar is a partner in Ibrahim Abdullahi & Co Chartered Accountant with over 10 years of experience. He was the Head of Finance at Top up Africa and Rumbu Sacks Nig Ltd. He is a fellow member of the Institute of Chartered Accountants of Nigeria (ICAN) and a student member of the Chartered Institute of Stockbrokers (CIS). Alhaji Abubakar owned 97.7% of Finance Teque Nigeria Limited.",
      linkedin: "",
      twitter: "",
    },
    {
      id: 3,
      name: "Saidu Idris Baraya",
      position: "Executive Director",
      imageUrl: "/team/board/saidu-baraya.jpeg",
      education:
        "B.Sc. Accounting, Bayero University | MBA, Ladoke Akintola University of Technology",
      expertise: "Financial Reporting, Accounting, Pension Fund Management",
      bio: "A highly organized and detail-focused accountant with an exceptional track record. He holds a Master's degree in Business Administration alongside certification as a Pension Fund Manager. Alhaji Baraya has worked with the Federal Ministry of Police Affairs, Nigerian Customs Service Fund Section, Sigma Bureau de Change Limited, Sigma Securities Limited and Nepa District Office Ilorin.",
      linkedin: "",
      twitter: "",
    },
    {
      id: 4,
      name: "Musa Haruna Hassan",
      position: "Director",
      imageUrl: "/team/board/haruna-musa-hassan.jpeg",
      education: "",
      expertise: "Business Development, Marketing",
      bio: "Alhaji Musa Haruna Hassan has been a key figure in business development and marketing for the company. He has held several positions, including Marketing Officer, Brand Manager, Product Manager, and currently serves as the Marketing Manager.",
      linkedin: "",
      twitter: "",
    },
    {
      id: 5,
      name: "Salamatu Musa Nasir",
      position: "Director",
      imageUrl: "/team/board/salamatu-musa-nasir.jpeg",
      education:
        "NCE, Federal College of Education | Pursuing B.Ed, Bayero University, Kano",
      expertise: "Education, Administration",
      bio: "Salamatu works as an Education Officer at the Nassarawa Local Education Authority. She owns 0.7% of the shares in Finance Teque, making her both a shareholder and a director.",
      linkedin: "",
      twitter: "",
    },
    {
      id: 6,
      name: "Ahmed Muhammed Abdul, ACA",
      position: "Independent Director",
      imageUrl: "/team/board/ahmed-mohammed-abdul.jpg",
      education:
        "HND Business Administration, Federal Polytechnic Mubi | Executive Management Accountancy, University of Lagos",
      expertise: "Chartered Accountancy, Financial Management",
      bio: "An associate member of the Institute of Chartered Accountants of Nigeria. Before his appointment at Finance Teque, he was the managing partner at Ahmed Abdul & Co Chartered Accountant Firm. He also served as the Deputy Director at the Salary and Pension Directorate in Jigawa State.",
      linkedin: "",
      twitter: "",
    },
  ];

  const managementTeam = [
    {
      id: 1,
      name: "Suleiman Abubakar",
      position: "Managing Director",
      imageUrl: "/team/management/suleiman-abubakar.jpeg",
      education:
        "B.Sc. Accountancy, Bayero University Kano | Master in Business and Commercial Law (M.B.C.L)",
      expertise: "Accountancy, Auditing, Advisory Services",
      bio: "Alhaji Suleiman Abubakar is a partner in Ibrahim Abdullahi & Co Chartered Accountant with over 10 years of experience. He was the Head of Finance at Top up Africa and Rumbu Sacks Nig Ltd. He is a fellow member of the Institute of Chartered Accountants of Nigeria (ICAN) and a student member of the Chartered Institute of Stockbrokers (CIS).",
      linkedin: "",
      twitter: "",
    },
    {
      id: 2,
      name: "Umar Mustapha Amadu",
      position: "Head of Investment & Portfolio",
      imageUrl: "/team/management/umar-mustapha-amadu.jpeg",
      education:
        "B.Sc. Banking and Finance, Kano State Polytechnic | Master's in Development Studies, Federal University Dutse",
      expertise: "Investment Management, Portfolio Analysis",
      bio: "Mr. Umar has held various positions as an Accounts Officer and has worked with ARM Pension Manager in Kano. He has participated in several professional training programs, including the ARM Internal Audit Training and Sales Effectiveness and Customer Experience Management Program.",
      linkedin: "",
      twitter: "",
    },
    {
      id: 3,
      name: "Aminu Sheikh Muhammad",
      position: "Compliance Officer",
      imageUrl: "/team/management/aminu-sheikh-muhammad.jpeg",
      education:
        "B.Sc. Accounting, Bayero University Kano | Master's in Accounting and Financial Management",
      expertise: "Tax Auditing, Compliance, Financial Management",
      bio: "Mr. Aminu has gained substantial experience in various sectors, including his role as a Tax Auditor at Crystal Partners Investment Limited, where he focused on tax audits and the recovery of personal income tax and withholding tax liabilities. He also contributed to the NASSCO social investment program.",
      linkedin: "",
      twitter: "",
    },
    {
      id: 4,
      name: "Amina Mohammed",
      position: "Head of Admin and Human Resource",
      imageUrl: "/team/management/amina-mohammed.jpeg",
      education: "B.Sc. Business Administration | MBA, Bayero University",
      expertise: "Administrative Management, HR, Business Development",
      bio: "Amina is a seasoned professional with over 20 years of experience in administrative management, business development, and customer service. Her career spans various industries, including eight years in banking and international development, where she has served as a short-term expert for organizations such as the EU, Ipas, Mafita (DFID), and the Enterprise Development Centre.",
      linkedin: "",
      twitter: "",
    },
  {
    id: 5,
    name: "Rabiu Abdu",
    position: "Head of Finance",
    imageUrl: "/team/management/rabiu-abdu.jpeg", // You'll need to add this image to your assets
    education: "B.Sc. Business Education (Accounting), Ahmadu Bello University, Zaria",
    expertise: "Financial Planning, Reporting, Investment Strategies",
    bio: "Mr. Rabiu Abdu holds a Bachelor's Degree in Business Education with Accounting specialization from Ahmadu Bello University, Zaria. He previously served as Sales and Production Manager at T&J Block Industry, where he managed operations, resources, and financial processes to support business growth. Beyond his corporate role, Mr. Rabiu has contributed to the academic field by tutoring accounting and finance across various institutions. Currently, as Head of Finance at Finance Teque Nigeria Limited, Mr. Rabiu oversees financial planning, reporting and investment strategies, combining industry experience and academic expertise to support the company's vision of sustainable growth.",
    linkedin: "",
    twitter: "",
  },
  ];

  return (
    <>
      {/* Navigation */}
      <Navigation />
      <div className="min-h-screen bg-background">
        {/* Banner Section */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative h-[75vh] flex items-center justify-center overflow-hidden"
        >
          <motion.div
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${dubaiCityscape})`,
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
          </motion.div>

          <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Leadership Team
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
              Meet the experienced professionals guiding Finance Teque's vision
              and operations
            </p>
          </div>
        </motion.section>

        <PageTransition>
          {/* Leadership Introduction */}
          <FadeIn mode="mount">
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold mb-6 text-brand-dark">
                  Governance & Leadership
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                  Finance Teque Nigeria Limited is governed by a six-member
                  Board of Directors with shareholder representation. The Board
                  is responsible for formulating corporate goals, targets, and
                  plans, as well as reviewing the company's performance. Our
                  day-to-day operations are managed by an experienced team of
                  qualified professionals across various departments.
                </p>

                <Tabs
                  defaultValue="board"
                  className="w-full max-w-7xl mx-auto mt-8"
                >
                  <TabsList className="flex w-full mb-8 h-12 gap-2 rounded-lg bg-gray-100 p-1">
                    <TabsTrigger
                      value="board"
                      className="flex-1 text-base md:text-lg rounded-md data-[state=active]:bg-brand-primary data-[state=active]:text-white transition-colors"
                    >
                      Board of Directors
                    </TabsTrigger>
                    <TabsTrigger
                      value="management"
                      className="flex-1 text-base md:text-lg rounded-md data-[state=active]:bg-brand-primary data-[state=active]:text-white transition-colors"
                    >
                      Management Team
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="board" className="mt-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {boardMembers.map((member) => (
                        <Card
                          key={member.id}
                          className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-start"
                          onClick={() => {
                            setSelectedMember(member);
                            setOpenModal(true);
                          }}
                        >
                          <CardContent className="p-0">
                            <div className="relative overflow-hidden">
                              <MotionImage
                                src={member.imageUrl}
                                alt={member.name}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-2xl"
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 6 }}
                                viewport={{ once: true, amount: 0.2 }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex space-x-3">
                                  {member.linkedin !== "" && (
                                    <a
                                      href={member.linkedin}
                                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-white/30 transition-colors"
                                    >
                                      <Linkedin className="h-5 w-5" />
                                    </a>
                                  )}
                                  {member.twitter !== "" && (
                                    <a
                                      href={member.twitter}
                                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-white/30 transition-colors"
                                    >
                                      <Twitter className="h-5 w-5" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="p-6">
                              <h3 className="text-xl font-bold mb-1">
                                {member.name}
                              </h3>
                              <p className="text-brand-primary font-medium mb-3">
                                {member.position}
                              </p>
                              {/* {member.education && (
                          <p className="text-sm text-muted-foreground mb-3">{member.education}</p>
                        )} */}
                              <p className="text-sm line-clamp-4">
                                {member.bio.length >= 150
                                  ? member.bio.slice(0, 150)
                                  : member.bio}
                                ...
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="management" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-8">
                      {managementTeam.map((member) => (
                        <Card
                          key={member.id}
                          className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group text-start pb-0"
                          onClick={() => {
                            setSelectedMember(member);
                            setOpenModal(true);
                          }}
                        >
                          <CardContent className="[&:last-child]:pb-0 p-0 flex flex-col lg:flex-row">
                            <div className="relative overflow-hidden w-full h-auto rounded-t-2xl lg:rounded-tl-2xl lg:rounded-bl-2xl">
                              <MotionImage
                                src={member.imageUrl}
                                alt={member.name}
                                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                whileInView={{ opacity: 1, y: 0 }}
                                initial={{ opacity: 0, y: 6 }}
                                viewport={{ once: true, amount: 0.2 }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex space-x-3">
                                  {member.linkedin !== "" && (
                                    <a
                                      href={member.linkedin}
                                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-white/30 transition-colors"
                                    >
                                      <Linkedin className="h-5 w-5" />
                                    </a>
                                  )}
                                  {member.twitter !== "" && (
                                    <a
                                      href={member.twitter}
                                      className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-white/30 transition-colors"
                                    >
                                      <Twitter className="h-5 w-5" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="p-6">
                              <h3 className="text-xl font-bold mb-1">
                                {member.name}
                              </h3>
                              <p className="text-brand-primary font-medium mb-3">
                                {member.position}
                              </p>
                              {member.education && (
                                <p className="text-sm text-muted-foreground mb-3">
                                  {member.education}
                                </p>
                              )}
                              <p className="text-sm line-clamp-4">
                                {member.bio.length >= 150
                                  ? member.bio.slice(0, 150)
                                  : member.bio}
                                ...
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </section>
          </FadeIn>
          {/* Company Structure */}
          <FadeIn>
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-brand-dark">
                    Our Company Structure
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                    Finance Teque Nigeria Limited operates with a well-defined
                    organizational structure designed to ensure effective
                    governance and operational efficiency.
                  </p>
                </div>

                <div className="relative max-w-6xl mx-auto">
                  {/* Company structure diagram - simplified version */}
                  <div className="grid grid-cols-1 gap-4">
                    {/* Board level */}
                    <div className="bg-brand-primary text-white p-4 rounded-lg text-center">
                      <h3 className="font-bold">Board of Directors</h3>
                      <p className="text-sm">
                        Strategic Oversight & Governance
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <div className="h-8 w-0.5 bg-gray-300"></div>
                    </div>

                    {/* Managing Director */}
                    <div className="bg-brand-secondary text-white p-4 rounded-lg text-center">
                      <h3 className="font-bold">Managing Director</h3>
                      <p className="text-sm">Executive Leadership</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <div className="h-8 w-0.5 bg-gray-300"></div>
                    </div>

                    {/* Department Heads */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-white p-4 rounded-lg text-center shadow-md">
                        <h3 className="font-bold text-brand-dark">
                          Investment & Portfolio
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Asset Management
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center shadow-md">
                        <h3 className="font-bold text-brand-dark">
                          Compliance & Risk Management
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Risk & Regulatory Oversight
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center shadow-md">
                        <h3 className="font-bold text-brand-dark">
                          Admin & Operations
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Processes & Support
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center shadow-md">
                        <h3 className="font-bold text-brand-dark">Finance</h3>
                        <p className="text-sm text-muted-foreground">
                          Treasury & Reporting
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg text-center shadow-md">
                        <h3 className="font-bold text-brand-dark">
                          Business & Marketing Development
                        </h3>
                        <p className="text-sm text-muted-foreground">
                         Expansion & Client Acquisition
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>
          {/* Values Section */}
          <FadeIn>
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-6 text-brand-dark">
                    Our Core Values
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
                    The principles that guide our leadership team and every
                    member of Finance Teque
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-brand-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Integrity</h3>
                    <p className="text-muted-foreground">
                      We uphold the highest standards of honesty and ethical
                      conduct in all our business dealings.
                    </p>
                  </div>

                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-brand-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Innovation</h3>
                    <p className="text-muted-foreground">
                      We constantly seek new and better ways to serve our
                      clients and adapt to changing market conditions.
                    </p>
                  </div>

                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-brand-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold mb-3">Client-Centric</h3>
                    <p className="text-muted-foreground">
                      We put our clients' needs at the center of everything we
                      do, striving to exceed expectations.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </FadeIn>
          {/* Join Our Team CTA */}
          <FadeIn>
            <section className="py-16 bg-gray-900 text-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  Are you passionate about finance and looking to make an
                  impact? We're always looking for talented individuals to join
                  our team.
                </p>
                <MotionButton
                  variant={"outline"}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  // href="/careers"
                  className=" bg-white text-brand-primary font-semibold px-8 py-5 rounded-md hover:bg-gray-100 transition-colors"
                >
                  View Open Positions
                </MotionButton>
              </div>
            </section>
          </FadeIn>
        </PageTransition>
        {selectedMember && (
          <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{selectedMember.name}</DialogTitle>
                <DialogDescription>
                  <span className="block font-medium text-brand-primary mb-2">
                    {selectedMember.position}
                  </span>
                  {selectedMember.education && (
                    <span className="block text-sm text-muted-foreground mb-2">
                      {selectedMember.education}
                    </span>
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center">
                <ImageWithFallback
                  src={selectedMember.imageUrl}
                  alt={selectedMember.name}
                  className="w-40 h-40 object-cover rounded-full mb-4"
                />
                <p className="text-sm mb-4">{selectedMember.bio}</p>
                <div className="flex space-x-3">
                  {selectedMember.linkedin && (
                    <a
                      href={selectedMember.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-6 w-6 text-brand-primary" />
                    </a>
                  )}
                  {selectedMember.twitter && (
                    <a
                      href={selectedMember.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-6 w-6 text-brand-primary" />
                    </a>
                  )}
                </div>
              </div>
              <DialogClose asChild>
                <MotionButton
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.98, y: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="mt-6 cursor-pointer px-4 py-2 bg-brand-primary text-white rounded"
                >
                  Close
                </MotionButton>
              </DialogClose>
            </DialogContent>
          </Dialog>
        )}

      </div>
    </>
  );
}

export default TeamPage;
