import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import { DashboardIcon, HomeIcon, ListBulletIcon } from "@radix-ui/react-icons";
import {
  BarChart,
  Book,
  Home,
  LogOut,
  LogInIcon,
  LogIn,
  Code,
  Trophy,
  ListCheck,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import StudentHomePage from "../student/home";
import AdminBulkRegisterPage from "@/components/admin-components";
import ContestsPage from "../contests";
import QuizCreator from "@/components/instructor-view/quiz";
import QuizDashboard from "./quiz-dashboard";

function InstructorDashboardpage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);


  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService();
    if (response?.success) setInstructorCoursesList(response?.data);
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItems = [
    {
      icon: HomeIcon,
      label: "Home",
      value: "home",
      component: null,
    },
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard listOfCourses={instructorCoursesList} />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
    {
      icon: Trophy,
      label: "Contests",
      value: "contests",
      component: <ContestsPage />,
    },
    {
      icon: ListBulletIcon,
      label: "Quiz",
      value: "quiz",
      component: <QuizCreator listOfCourses={instructorCoursesList} />
    },
    {
      icon: DashboardIcon,
      label: "Quiz Dashboard",
      value: "quiz-dashboard",
      component: <QuizDashboard listOfCourses={instructorCoursesList} />
    },
    {
      icon: LogIn,
      label: "Bulk Register",
      value: "bulk register",
      component: <AdminBulkRegisterPage />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    localStorage.clear();
  }

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Instructor View</h2>
          <nav>
            {menuItems.map((menuItem) => (
              <Button
                className="w-full justify-start mb-2"
                key={menuItem.value}
                variant={activeTab === menuItem.value ? "secondary" : "ghost"}
                onClick={
                  menuItem.value === "logout"
                    ? handleLogout
                    : menuItem.value === "home"
                      ? () => {
                        window.location.href = "/";
                      }
                      : () => setActiveTab(menuItem.value)
                }
              >
                <menuItem.icon className="mr-2 h-4 w-4" />
                {menuItem.label}
              </Button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent key={menuItem.value} value={menuItem.value}>
                {menuItem.component !== null ? menuItem.component : null}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
    </div>
  );
}

export default InstructorDashboardpage;
