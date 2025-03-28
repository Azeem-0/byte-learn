import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { nContext } from "@/context/notification-context";
import { deleteCourseService } from "@/services";
import { Delete, Edit } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function InstructorCourses({ listOfCourses }) {
  const navigate = useNavigate();
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);

  const {notify} = useContext(nContext);

  async function handleDeleteLecture(course_id) {
    try {
      const response = await deleteCourseService(course_id);

      if (response?.success) {
        notify("The lecture has been successfully deleted.");
      } else {
        notify("Failed to delete the lecture.");
      }
    } catch (error) {
      console.error("Error deleting lecture:", error);
      notify("Failed to delete the lecture.");
    }
  } 

  return (
    <Card>
      <CardHeader className="flex justify-between flex-row items-center">
        <CardTitle className="text-3xl font-extrabold">All Courses</CardTitle>
        <Button
          onClick={() => {
            setCurrentEditedCourseId(null);
            setCourseLandingFormData(courseLandingInitialFormData);
            setCourseCurriculumFormData(courseCurriculumInitialFormData);
            navigate("/instructor/create-new-course");
          }}
          className="p-6"
        >
          Create New Course
        </Button>
      </CardHeader>
      <CardContent>
        {listOfCourses && listOfCourses.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listOfCourses.map((course, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {course?.title.length > 20 ? `${course?.title.substring(0, 20)}...` : course?.title}
                    </TableCell>
                    <TableCell>{course?.students?.length}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        onClick={() => {
                          navigate(`/instructor/edit-course/${course?._id}`);
                        }}
                        variant="ghost"
                        size="sm"
                      >
                        <Edit className="h-6 w-6" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteLecture(course._id)}>
                        <Delete className="h-6 w-6" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-md font-light text-center">
            You don't have any courses yet. Click the "Create New Course" button above to
            create one.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default InstructorCourses;
