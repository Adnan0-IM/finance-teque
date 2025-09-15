import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  ArrowRight,
  Linkedin,
  Twitter,
  Users,
  Award,
  TrendingUp,
  Shield,
} from "lucide-react";
import { ImageWithFallback } from "../components/ImageWithFallback";
import dubaiCityscape from "../assets/business-banner@2x.jpg";
import Navigation from "@/components/Navigation";
import ModalButton from "@/components/ModalButton";
import { Toaster } from "sonner";
import { Link } from "react-router";
export function TeamPage() {
  const teamMembers = [
    {
      id: 1,
      name: "Amina Hassan",
      title: "Chief Executive Officer",
      bio: "With over 15 years of experience in Islamic finance and investment management, Amina leads our strategic vision and ensures our commitment to ethical investing principles.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: 2,
      name: "Ibrahim Abdullahi",
      title: "Chief Investment Officer",
      bio: "Ibrahim brings 12 years of portfolio management expertise, specializing in emerging markets and technology sector investments across Africa and the Middle East.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: 3,
      name: "Fatima Al-Zahra",
      title: "Head of Shari'ah Compliance",
      bio: "Dr. Fatima holds a PhD in Islamic Jurisprudence and ensures all our investment decisions align with Islamic principles and ethical standards.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: 4,
      name: "Yusuf Mohammed",
      title: "Senior Portfolio Manager",
      bio: "Yusuf manages our growth investment portfolios and has a proven track record in identifying high-potential technology companies in emerging markets.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: 5,
      name: "Aisha Suleiman",
      title: "Head of Client Relations",
      bio: "Aisha leads our client services team and ensures every investor receives personalized guidance aligned with their financial goals and values.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      linkedin: "#",
      twitter: "#",
    },
    {
      id: 6,
      name: "Umar Kano",
      title: "Risk Management Director",
      bio: "Umar oversees our comprehensive risk assessment framework and ensures optimal portfolio diversification across all our investment strategies.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face",
      linkedin: "#",
      twitter: "#",
    },
  ];

  const companyValues = [
    {
      icon: Shield,
      title: "Integrity",
      description:
        "We maintain the highest ethical standards in all our business practices and investment decisions.",
    },
    {
      icon: TrendingUp,
      title: "Excellence",
      description:
        "We strive for exceptional performance and continuous improvement in serving our clients.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We work together as a team to deliver the best outcomes for our investors and communities.",
    },
    {
      icon: Award,
      title: "Innovation",
      description:
        "We embrace innovative approaches to investment management while respecting traditional values.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation  */}
      <Navigation />
      {/* Header Section */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${dubaiCityscape})`,
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 text-center text-primary-foreground max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Team</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Meet the people behind our mission to deliver ethical investment
            solutions and sustainable financial growth.
          </p>
        </div>
      </section>

      {/* Team Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
              Leadership Team
            </h3>
            <h2 className="text-4xl font-bold mb-6 text-primary">
              Experienced Professionals Committed to Your Success
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our diverse team of investment professionals, Islamic finance
              experts, and client service specialists work together to deliver
              exceptional results while maintaining the highest ethical
              standards.
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <ImageWithFallback
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="flex space-x-3">
                        <a
                          href={member.linkedin}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-white/30 transition-colors"
                        >
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a
                          href={member.twitter}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground hover:bg-white/30 transition-colors"
                        >
                          <Twitter className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3">
                      {member.title}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6 text-primary">
              Our Core Values
            </h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide our team and drive our commitment to
              excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <Card
                  key={index}
                  className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow text-center"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-secondary/90 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="h-8 w-8 text-brand-primary-dark" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Team by the Numbers</h2>
            <p className="text-xl opacity-90">
              Experience and expertise you can trust
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">25+</div>
              <p className="text-xl opacity-90">Team Members</p>
              <p className="text-sm opacity-75 mt-2">Across all departments</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-2">150+</div>
              <p className="text-xl opacity-90">Years Combined Experience</p>
              <p className="text-sm opacity-75 mt-2">
                In finance and investment
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-2">12</div>
              <p className="text-xl opacity-90">Countries Represented</p>
              <p className="text-sm opacity-75 mt-2">
                Diverse global perspectives
              </p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-bold mb-2">5</div>
              <p className="text-xl opacity-90">Shari'ah Scholars</p>
              <p className="text-sm opacity-75 mt-2">Ensuring compliance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="w-24 h-24 bg-secondary/90 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Users className="h-12 w-12 text-brand-primary-dark" />
            </div>
          </div>

          <h2 className="text-4xl font-bold mb-6 text-primary">
            Join Our Team
          </h2>

          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            We're always looking for talented individuals who share our passion
            for ethical investing and commitment to excellence. Join a team that
            values integrity, innovation, and making a positive impact in the
            world of finance. Explore opportunities to grow your career while
            contributing to meaningful financial solutions that align with
            Islamic principles and sustainable practices.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link className="w-full" to={"/about"}>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-4 border-primary text-primary hover:bg-primary hover:text-white"
              >
                Learn About Our Culture
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-bold mb-3">Why Work With Us?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">
                  Professional Development
                </strong>
                <br />
                Continuous learning opportunities and career advancement
                programs
              </div>
              <div>
                <strong className="text-foreground">Work-Life Balance</strong>
                <br />
                Flexible working arrangements and comprehensive benefits package
              </div>
              <div>
                <strong className="text-foreground">Meaningful Impact</strong>
                <br />
                Contribute to ethical investing and positive social change
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-900 text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Work with Our Expert Team?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Schedule a consultation with our investment professionals and
            discover how we can help achieve your financial goals.
          </p>

          <ModalButton
            className="cursor-pointer bg-primary hover:bg-primary/70 border px-8 py-4 text-primary-foreground"
            text="Schedule a Consultation"
          />
        </div>
      </section>
      <Toaster className="text-base" position="top-right" duration={3000} />
    </div>
  );
}
