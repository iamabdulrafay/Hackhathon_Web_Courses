from rest_framework import viewsets
from .models import Courses, CourseDetails, CourseOutline 
from .serializers import CoursesSerializer, CourseDetailsSerializer, CourseOutlineSerializer

class CourseList(viewsets.ModelViewSet):
    queryset = Courses.objects.all()
    serializer_class = CoursesSerializer

class CourseDetailsListView(viewsets.ModelViewSet):
    serializer_class = CourseDetailsSerializer

    def get_queryset(self):
        course_id = self.request.query_params.get('course_id', None)
        if course_id:
            return CourseDetails.objects.filter(course_id=course_id)
        return CourseDetails.objects.none()

class CourseOutlineViewSet(viewsets.ModelViewSet):
    queryset = CourseOutline.objects.all()
    serializer_class = CourseOutlineSerializer

    def get_queryset(self):
        course_id = self.request.query_params.get('course_id', None)
        if course_id:
            return CourseOutline.objects.filter(course_id=course_id)
        return CourseOutline.objects.none()


